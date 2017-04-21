import {register} from '../registry';

import {
    cx,
    Calendar,
    Checkbox,
    ColorField,
    ColorPicker,
    DateField,
    LookupField,
    MonthField,
    MonthPicker,
    NumberField,
    Radio,
    Select,
    TextArea,
    TextField,
    Section,
    FlexRow,
    Button,
    MsgBox,
    CheckboxProps,
    Repeater,
    Text,
    Slider,
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller} from "cx/ui";


class PageController extends Controller {
    onInit() {
        this.store.init('$page', {
            name: 'Jane',
            disabled: true,
            todoList: [
                { id: 1, text: 'Learn Cx', done: true }, 
                { id: 2, text: "Feed the cat", done: false },
                { id: 3, text: "Take a break", done: false }
            ],
            count: 0
        });
    }

    greet() {
        let name = this.store.get('$page.name')
        MsgBox.alert(`Hello, ${name}!`);
    }
}
class CbController extends Controller {
   init() {
      this.addTrigger('t1', ['$page.cb1'], cb1 => {
         this.store.set('$page.cb2', !cb1);
      });
      this.addTrigger('t2', ['$page.cb2'], cb2 => {
         this.store.set('$page.cb1', !cb2);
      });
   }
}
class InfoController extends Controller {
   init() {
      this.store.set('$page.cities', [{id: 'ams', text: 'Amsterdam', population: '1.6M'}, {id: 'bg',text: 'Belgrade',population: '3M'}]);

      this.addComputable('$page.city', ['$page.cities', '$page.cityId'], (options, id) => {
         return options.find(o=>o.id == id);
      });
   }
}
class MethodController extends Controller {
   sayHello() {
      MsgBox.alert('Hello!');
   }
}
register('Controller', 'Other examples', <cx>
    <h2 putInto="header">Form Fields</h2>
    <div class="example pad wrap">
        <h3>Store</h3>
        <FlexRow wrap spacing="large">
            <Section mod="well" header={{ level: 5, text: 'Counter'}} layout={{type: LabelsTopLayout, vertical: true}}>
               <div controller={CbController}>
                    <Checkbox value={{ bind: "$page.cb1" }}>Checkbox 1</Checkbox>
                    <br/>
                    <Checkbox value={{ bind: "$page.cb2" }}>Checkbox 2</Checkbox>
               </div>
            </Section>
            <Section mod="well">
              <div controller={MethodController}>
              <Button onClick={(e, {controller})=>{ controller.sayHello();}}>Say Hello</Button>
              </div>
            </Section>
            <Section mod="well">
                <div controller={InfoController}>
                    <Select value={{ bind: "$page.cityId" }}>
                        <Repeater records={{ bind: '$page.cities' }}>
                            <option value={{ bind: '$record.id' }} text={{ bind: '$record.text' }}/>
                        </Repeater>
                    </Select>
                    <p visible={{ expr: '{$page.cityId}' }}>
                        <Text tpl='{$page.city.text} has {$page.city.population} people.' />
                    </p>
                 </div>
            </Section>
           
        </FlexRow>
    </div>
</cx>);









