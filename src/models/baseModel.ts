import { IEvents } from '../components/base/Events';


export abstract class BaseModel {
  constructor(protected events: IEvents) {}


  protected emitChange<T extends object>(eventName: string, data?: T): void {
    this.events.emit(eventName, data);
  }
}
