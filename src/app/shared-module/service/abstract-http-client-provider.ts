/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { environment } from 'src/environment/environment';

export abstract class AbstractHttpClientProvider {
  protected _apiUrl = environment.apiUrl;
}
