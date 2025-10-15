import { environment } from 'src/environment/environment';

export abstract class AbstractHttpClientProvider {
  protected _apiUrl = environment.apiUrl;
}
