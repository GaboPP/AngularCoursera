import { TestBed } from '@angular/core/testing';

import { ReservasApiClientService } from './reservas-api-client.service';

describe('ReservasApiClientService', () => {
  let service: ReservasApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservasApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
