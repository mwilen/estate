

/**
 * @param {string} customKey - Set a custom key identifier. If none is provided, the name of the property will be used instead.
 */
export function Property(customKey?: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let value;
    let key = customKey || propertyKey
    const state = StateStore;
    const getter = function() {
      return state.store[key];
    };
  
    const setter = function(newVal) {
      state.store[key] = newVal;
      console.log(state.store, key, newVal)
      state.setState(key, state[key])
      value = newVal;
    }; 

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
 
class StoreProperty {

  private _value: any;

  constructor(key: string, value: any){
    
    const getter = () => {
      return this._value as any;
    };
  
    const setter = (newVal) => {
      this._value = newVal;
    };

    Object.defineProperty(this, 'value', {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });

    this[key] = value
  }
}

class GlobalStateStore {

  store = {};

  private storeChangeHandler = {
    set: (obj, prop,) => {
      for(const subscription of this.subscriptions){
        if(subscription.key === prop){
          console.log("obj", obj, prop)
          subscription.callback(this.store[prop]);
        }
      }
      return true;
    }
  };

  private subscriptions: {key: string, callback: Function}[] = [];

  private storeObserver = new Proxy(this.store, this.storeChangeHandler);

  setState(property: any, value): void {
    this.storeObserver[property] = value;
  }

  subscribeTo(key: any, callback: (value: any) => any): any {
    this.subscriptions.push({ key, callback });
    console.log('this.subscriptions', this.subscriptions)
  }
}

export const StateStore = new GlobalStateStore(); 