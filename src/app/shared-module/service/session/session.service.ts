import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  public static readonly MAX_INACTIVITY_TIME_SEC = 15 * 60; // 15 min
  public static readonly MAX_RESPONSE_WAITING_SEC = 30; // 30 sec

  private readonly _warningAudio: HTMLMediaElement = new Audio(
    'assets/end-session.mp3'
  );

  private _sessionInterval?: number;
  private _waitingScreenInterval?: number;
  private _counter = 0;
  private _waitingScreenCounter = 0;
  private _tickCurrentlyBlocked = false;
  private _savedWindowTitle = '';

  private _sessionTime$ = new BehaviorSubject<number>(
    SessionService.MAX_INACTIVITY_TIME_SEC
  );
  private _responseWaitingTime$ = new BehaviorSubject<number>(
    SessionService.MAX_RESPONSE_WAITING_SEC
  );

  constructor(private readonly _titleService: Title) {}

  startSession(): void {
    if (!this._tickCurrentlyBlocked) {
      this._counter = SessionService.MAX_INACTIVITY_TIME_SEC;
      this.onTickTimerAction();
      this._sessionInterval = window.setInterval(
        () => this.onTickTimerAction(),
        1000
      );
    }
  }

  stopSession(): void {
    this._tickCurrentlyBlocked = false;
    this._sessionTime$.next(SessionService.MAX_INACTIVITY_TIME_SEC);
    this._responseWaitingTime$.next(SessionService.MAX_RESPONSE_WAITING_SEC);
    window.clearInterval(this._sessionInterval);
    window.clearInterval(this._waitingScreenInterval);
  }

  renewSession(): void {
    if (!this._tickCurrentlyBlocked) {
      window.clearInterval(this._sessionInterval);
      this.startSession();
    }
  }

  startWaitingScreenCounter(): void {
    this._savedWindowTitle = this._titleService.getTitle();
    this._waitingScreenCounter = SessionService.MAX_RESPONSE_WAITING_SEC;
    this.onTickWaitingScreenCounter();
    this._waitingScreenInterval = window.setInterval(
      () => this.onTickWaitingScreenCounter(),
      1000
    );
  }

  unlockListenerAndRenewSession(): void {
    this._tickCurrentlyBlocked = false;
    this._titleService.setTitle(this._savedWindowTitle);
    this.stopSession();
    this.renewSession();
  }

  unlockListener(): void {
    this._tickCurrentlyBlocked = false;
  }

  private onTickWaitingScreenCounter(): void {
    this._responseWaitingTime$.next(this._waitingScreenCounter);
    this._titleService.setTitle(
      `Pozostało ${this._waitingScreenCounter} sekund do wylogowania!`
    );
    if (this._waitingScreenCounter % 5 === 0) {
      this._warningAudio.play().then(r => r);
    }
    if (this._waitingScreenCounter-- === 0) {
      this._titleService.setTitle(this._savedWindowTitle);
      window.clearInterval(this._waitingScreenInterval);
    }
  }

  private onTickTimerAction(): void {
    this._sessionTime$.next(this._counter);
    if (this._counter-- <= 0) {
      window.clearInterval(this._sessionInterval);
      this._tickCurrentlyBlocked = true;
      this.startWaitingScreenCounter();
    }
  }

  get sessionSoonEnded$(): Observable<boolean> {
    return this._sessionTime$.pipe(map(time => time < 15));
  }
  get sessionCurrentTime$(): Observable<number> {
    return this._sessionTime$.pipe(map(time => time * 1000)); // to ms for date pipe
  }
  get currentWaitingTime$(): Observable<number> {
    return this._responseWaitingTime$.asObservable();
  }
  get isSessionEnded$(): Observable<boolean> {
    return combineLatest([this._sessionTime$, this._responseWaitingTime$]).pipe(
      map(([time, waitingTime]) => time === 0 && waitingTime !== 0)
    );
  }
}
