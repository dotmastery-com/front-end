import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler} from '@angular/common/http';

import { DataService } from './data.service';
import { EnvService } from './env.service';
import { User } from '../model/user';

describe('DataService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let dataService : DataService;
  

  beforeEach( () => {
     httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
     dataService: new DataService(<any> httpClientSpy, new EnvService());
  })


  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });


  it ('should return true for valid user', () => {
    const input: User = {} 

    dataService.authUser(input).subscribe(
      user => console.log(user),
      fail
    )
    httpClientSpy.get.and.returnValue(input)
  })
  

});
