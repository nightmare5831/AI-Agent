import { NextResponse } from 'next/server';

class HTTPResponse {
  private buildMessage = (message: any) => {
    if (typeof message === 'object') message = JSON.stringify(message);
    return message;
  };

  SUCCESS = (message: any) => {
    return NextResponse.json(message);
  };

  BAD_REQUEST = (message: any) => {
    return new NextResponse(this.buildMessage(message), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  UNAUTHORIZED = (message: any) => {
    return new NextResponse(this.buildMessage(message), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  FORBIDDEN = (message: any) => {
    return new NextResponse(this.buildMessage(message), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  HTTP_NOT_FOUND = (message: any) => {
    return new NextResponse(this.buildMessage(message), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  METHOD_NOT_ALLOWED = (message: any) => {
    return new NextResponse(this.buildMessage(message), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  INTERNAL_SERVER_ERROR = (message: any) => {
    return new NextResponse(this.buildMessage(message), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}

export const HTTP = new HTTPResponse();
