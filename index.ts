// Import stylesheets
import './style.css';

import { StateStore, Property } from './estate';

class MyComponent {
  @Property()
  a: string = 'asada';
  b: boolean;
  c: number;
  @Property('hej')
  arr: string[];

  constructor() {
    StateStore.subscribeTo('a', (value: any) => {
      console.log('changed', value);
      document.querySelector('.input-value').innerHTML = value;
    });

    StateStore.subscribeTo('hej', (value: string[]) => {
      document.querySelector('.list').innerHTML = value.reduce((acc, curr) => acc + `<div>${curr}</div>`);
    });

    this.arr = ['a', 'b', 'c'];

    setTimeout(() => {
      this.arr = ['hej', '1', '123f123'];
    }, 3000)
    
    document.querySelector('.myInput').addEventListener('keyup', (event: KeyboardEvent) => {
      this.a = (event.target as HTMLInputElement).value;
    })
  }
}

class Component2 {

  constructor(){
    StateStore.subscribeTo('a', (value: any) => {
      console.log('changed a', value)
    });
  }
}

const component = new MyComponent();
const component2 = new Component2();
