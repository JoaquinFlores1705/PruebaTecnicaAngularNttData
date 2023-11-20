import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FinancialProductsService } from './financial-products.service';
import { FinancialProduct } from 'src/app/shared/models/financial-product-model';
import { HttpErrorResponse } from '@angular/common/http';

describe('FinancialProductsService', () => {
  let service: FinancialProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FinancialProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should send a GET request and return multiple items', (done) => {

    const expectedProducts = [
      {
          id: "trj-crdjp",
          name: "Tarjetas de credito",
          description: "Tarjeta de consumo bajo modalidad de credito",
          logo: "https://www.zarla.com/images/zarla-stock-asesores-1x1-2400x2400-20210603-r8cqy98vt3yxdkctpmhm.png",
          date_release: "2023-10-26T00:00:00.000+00:00",
          date_revision: "2024-10-26T00:00:00.000+00:00"
      },
      {
        id: "trj-crdjp2",
        name: "Tarjetas de credito2",
        description: "Tarjeta de consumo bajo modalidad de credito",
        logo: "https://www.zarla.com/images/zarla-stock-asesores-1x1-2400x2400-20210603-r8cqy98vt3yxdkctpmhm.png",
        date_release: "2023-10-26T00:00:00.000+00:00",
        date_revision: "2024-10-26T00:00:00.000+00:00"
    }];

    service.get().subscribe({
      next: (items: FinancialProduct[]) => {
        expect(items).toBeDefined();
        done();
      },
      error: (error) => { fail(error.message) }
    });

    const testRequest = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(expectedProducts);

  });

  it('get should return an error if an 400 error', (done) => {

    const errMessage = `Header 'authorId' is missing`;

    const errorResponse = new HttpErrorResponse({
      error: "Header 'authorId' is missing",
      status: 400,
    });

    service.get().subscribe({
      next: (items: FinancialProduct[]) => {
        fail('The request is supposed to throw an error');
      },
      error: (error) => {
        expect(error.statusText).toBe(errMessage)
        done();
      }
    });

    const testRequest = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(errorResponse, { status: 400, statusText: errMessage });

  });

  it('create financial product should send a POST request and return the newly created item', (done) => {

    const item: FinancialProduct = {
      id: "trj-crdjp",
      name: "Tarjetas de credito",
      description: "Tarjeta de consumo bajo modalidad de credito",
      logo: "https://www.zarla.com/images/zarla-stock-asesores-1x1-2400x2400-20210603-r8cqy98vt3yxdkctpmhm.png",
      date_release: "2023-10-26T00:00:00.000+00:00",
      date_revision: "2024-10-26T00:00:00.000+00:00"
    };

    service.create(item).subscribe({
      next: (data: FinancialProduct) => {
        expect(data).toBeDefined();
        expect(data).toEqual(item);
        done();
      },
      error: (error) => { fail(error.message) }
    });

    const testRequest = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(item);

  });

  it('create financial product should send a POST request and return the newly created item whith 206 error', (done) => {

    const item: FinancialProduct = {
      name: "must not be null",
      description: "must not be null"
    };

    service.create(item).subscribe({
      next: (data: FinancialProduct) => {
        expect(data).toBeDefined();
        expect(data).toEqual(item);
        done();
      },
      error: (error) => { fail(error.message) }
    });

    const testRequest = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(item, { status: 206, statusText: "Partial Content" });

  });

  it('create financial product should return an error if an 400 error', (done) => {

    const errMessage = `Header 'authorId' is missing`;

    const errorResponse = new HttpErrorResponse({
      error: "Header 'authorId' is missing",
      status: 400,
    });

    const item: FinancialProduct = {
      id: "trj-crdjp",
      name: "Tarjetas de credito",
      description: "Tarjeta de consumo bajo modalidad de credito",
      logo: "https://www.zarla.com/images/zarla-stock-asesores-1x1-2400x2400-20210603-r8cqy98vt3yxdkctpmhm.png",
      date_release: "2023-10-26T00:00:00.000+00:00",
      date_revision: "2024-10-26T00:00:00.000+00:00"
    };

    service.create(item).subscribe({
      next: (data: FinancialProduct) => {
        fail('The request is supposed to throw an error');
      },
      error: (error) => {
        expect(error.statusText).toBe(errMessage);
        done(); }
    });

    const testRequest = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(errorResponse, { status: 400, statusText: errMessage });

  });

  it('update financial product should send a PUT request and return the item update', (done) => {

    const item: FinancialProduct = {
      id: "trj-crdjp",
      name: "Tarjetas de credito Update",
      description: "Tarjeta de consumo bajo modalidad de credito",
      logo: "https://www.zarla.com/images/zarla-stock-asesores-1x1-2400x2400-20210603-r8cqy98vt3yxdkctpmhm.png",
      date_release: "2023-10-26T00:00:00.000+00:00",
      date_revision: "2024-10-26T00:00:00.000+00:00"
    };

    service.update(item).subscribe({
      next: (data: FinancialProduct) => {
        expect(data).toBeDefined();
        expect(data).toEqual(item);
        done();
      },
      error: (error) => { fail(error.message) }
    });

    const testRequest = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(testRequest.request.method).toBe('PUT');
    testRequest.flush(item);

  });

  it('update financial product should send a PUT request and return the newly created item whith 206 error', (done) => {

    const item: FinancialProduct = {
      name: "must not be null",
      description: "must not be null"
    };

    service.update(item).subscribe({
      next: (data: FinancialProduct) => {
        expect(data).toBeDefined();
        expect(data).toEqual(item);
        done();
      },
      error: (error) => { fail(error.message) }
    });

    const testRequest = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(testRequest.request.method).toBe('PUT');
    testRequest.flush(item, { status: 206, statusText: "Partial Content" });

  });

  it('update financial product should return an error if an 400 error', (done) => {

    const errMessage = `Header 'authorId' is missing`;

    const errorResponse = new HttpErrorResponse({
      error: "Header 'authorId' is missing",
      status: 400,
    });

    const item: FinancialProduct = {
      id: "trj-crdjp",
      name: "Tarjetas de credito Update",
      description: "Tarjeta de consumo bajo modalidad de credito",
      logo: "https://www.zarla.com/images/zarla-stock-asesores-1x1-2400x2400-20210603-r8cqy98vt3yxdkctpmhm.png",
      date_release: "2023-10-26T00:00:00.000+00:00",
      date_revision: "2024-10-26T00:00:00.000+00:00"
    };

    service.update(item).subscribe({
      next: (data: FinancialProduct) => {
        fail('The request is supposed to throw an error');
      },
      error: (error) => {
        expect(error.statusText).toBe(errMessage);
        done();
      }
    });

    const testRequest = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(testRequest.request.method).toBe('PUT');
    testRequest.flush(errorResponse, { status: 400, statusText: errMessage });

  });

  it('update financial product should return an error if an 401 error', (done) => {

    const errMessage = `You must be the owner`;

    const errorResponse = new HttpErrorResponse({
      error: "You must be the owner",
      status: 401,
    });

    const item: FinancialProduct = {
      id: "trj-crdjp",
      name: "Tarjetas de credito Update",
      description: "Tarjeta de consumo bajo modalidad de credito",
      logo: "https://www.zarla.com/images/zarla-stock-asesores-1x1-2400x2400-20210603-r8cqy98vt3yxdkctpmhm.png",
      date_release: "2023-10-26T00:00:00.000+00:00",
      date_revision: "2024-10-26T00:00:00.000+00:00"
    };

    service.update(item).subscribe({
      next: (data: FinancialProduct) => {
        fail('The request is supposed to throw an error');
      },
      error: (error) => {
        expect(error.statusText).toBe(errMessage);
        done();
      }
    });

    const testRequest = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect(testRequest.request.method).toBe('PUT');
    testRequest.flush(errorResponse, { status: 401, statusText: errMessage });

  });

  it('delete financial product should send a DELETE request a message', (done) => {

    const codeItem: string = "trj-crdjp";

    service.delete(codeItem).subscribe({
      next: (data: string) => {
        expect(data).toBeDefined();
        done();
      },
      error: (error) => { fail(error.message) }
    });

    const testRequest = httpMock.expectOne(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id=${codeItem}`);
    expect(testRequest.request.method).toBe('DELETE');
    testRequest.flush(codeItem);

  });

  it('delete financial product should return an error if an 400 error', (done) => {

    const errMessage = `Header 'authorId' is missing`;

    const errorResponse = new HttpErrorResponse({
      error: "Header 'authorId' is missing",
      status: 400,
    });

    const codeItem: string = "trj-crdjp";

    service.delete(codeItem).subscribe({
      next: (data: string) => {
        fail('The request is supposed to throw an error');
      },
      error: (error) => {
        expect(error.statusText).toBe(errMessage);
        done();
      }
    });

    const testRequest = httpMock.expectOne(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id=${codeItem}`);
    expect(testRequest.request.method).toBe('DELETE');
    testRequest.flush(errorResponse, { status: 400, statusText: errMessage });

  });

  it('delete financial product should return an error if an 404 error', (done) => {

    const errMessage = `Not product found with that id`;

    const errorResponse = new HttpErrorResponse({
      error: "Not product found with that id",
      status: 404,
    });

    const codeItem: string = "trj-crdjp";

    service.delete(codeItem).subscribe({
      next: (data: string) => {
        fail('The request is supposed to throw an error');
      },
      error: (error) => {
        expect(error.statusText).toBe(errMessage);
        done();
      }
    });

    const testRequest = httpMock.expectOne(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products?id=${codeItem}`);
    expect(testRequest.request.method).toBe('DELETE');
    testRequest.flush(errorResponse, { status: 404, statusText: errMessage });

  });

  it('verify Id financial product should send a GET request a boolean', (done) => {

    const codeItem: string = "trj-crdjp";

    service.verify(codeItem).subscribe({
      next: (data: boolean) => {
        expect(data).toBeDefined();
        done();
      },
      error: (error) => { fail(error.message) }
    });

    const testRequest = httpMock.expectOne(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification?id=${codeItem}`);
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(codeItem);

  });

});
