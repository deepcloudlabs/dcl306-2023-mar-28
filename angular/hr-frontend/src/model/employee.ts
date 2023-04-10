export class Employee {
  constructor(
    public identityNo :	string,
    public fullname:	string,
    public iban :	string,
    public photo	: string,
    public birthYear: number,
    public salary	: number,
    public department	: string,
    public fulltime	: boolean
  ) {
  }
}
