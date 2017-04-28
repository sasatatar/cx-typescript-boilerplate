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
    Overlay,
    Window,
    Toast
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller} from "cx/ui";


class PageController extends Controller {
    init() {
   super.init();
   this.store.set('$page.records', Array.from({length: 5}).map((v, i)=>({
      id: i+1,
      fullName: casual.full_name,
      phone: casual.phone,
      city: casual.city,
      notified: casual.coin_flip
   })));
  }
 }

var addOverlay = store => {
   var overlay = Overlay.create(<cx>
      <Overlay style={{
         left: Math.random()*100+'%',
         top: Math.random()*100+'%',
         padding: '30px',
         border: '2px solid gray',
         background: '#efefef',
         textAlign: 'center'
      }}>
         This overlay will automatically close after 5s.
      </Overlay>
   </cx>);

   var close = overlay.open(store);

   setTimeout(close, 5000);
};
function randomColor() {
    let r = (Math.random() * 100 + 155).toFixed(0);
    let g = (Math.random() * 100 + 155).toFixed(0);
    let b = (Math.random() * 100 + 155).toFixed(0);
    return `rgb(${r},${g},${b})`;
}

function createToast(e, {store}, placement) {
    let toast = Toast.create({
        message: 'This is a random toast.',
        style: `background: ${randomColor()}; border-radius: 5px`,
        placement: placement,
        timeout: 2000
    });
    toast.open(store);
}

register('Overlays', 'Other examples', <cx>
    <h2 putInto="header">Overlays</h2>
    <div class="example pad wrap">
        <FlexRow wrap spacing="large">
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div class="widgets">
                    <Checkbox value={{ bind: "$page.overlay" }}>Show Overlay</Checkbox>
                    <Overlay visible={{ bind: "$page.overlay" }} style={{background: 'yellow', padding: '30px'}} draggable>
                        This is a draggable overlay.
                    </Overlay>
                </div>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Button
                        onClick={(e, {store}) => { addOverlay(store); }}>
                    Add Overlay
                </Button>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Button onClick={(e, {store}) => { store.set('$page.contact.visible', true)}}>Open</Button>
                <Window title="Contact"
                        visible={{ bind: "$page.contact.visible", defaultValue: false }}
                        center
                        style={{width: '500px'}}
                        modal>
                <div style={{padding: "20px"}} layout={{type: LabelsLeftLayout, mod: 'stretch'}}>
                    <TextField label="Name" value={{ bind: "$page.contact.name" }} style={{width: '100%'}} />
                    <TextField label="Email" value={{ bind: "$page.contact.email" }} style={{width: '100%'}}/>
                    <TextArea label="Message" value={{ bind: "$page.contact.message" }} rows={10} style={{width: '100%'}}/>
                    <DateField label="Date" value={{ bind: "$page.contact.date" }}/>
                </div>
                <div putInto="footer" style={{float:"right"}} trimWhitespace={false}>
                    <Button mod="primary">Submit</Button>
                    <Button onClick={(e, ins) => { ins.parentOptions.dismiss() }}>
                        Cancel
                    </Button>
                </div>
                </Window>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Button onClick={ e => { MsgBox.alert({ message: 'This is an alert!' }) }}>Alert</Button>
                <Button type="button" onClick={ e => {
                    MsgBox.yesNo({ message: 'Would you like to see another alert?' })
                        .then((btn) => { if (btn == 'yes') MsgBox.alert('Here it is.') });
                }}>
                    Yes or No
                </Button>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Button onClick={ (e, ins) => createToast(e, ins, 'left')}>Left Toast</Button>
                <Button onClick={ (e, ins) => createToast(e, ins, 'right')}>Right Toast</Button>
                <Button onClick={ (e, ins) => createToast(e, ins, 'top')}>Top Toast</Button>
                <Button onClick={ (e, ins) => createToast(e, ins, 'bottom')}>Bottom Toast</Button>

                <Button onClick={ (e, {store}) => store.toggle('$page.toast.visible')}>Toggle Toast</Button>
                <Button onClick={ (e, {store}) => store.toggle('$page.complex.visible')}>Complex Toast</Button>

                <Toast visible={{ bind: "$page.toast.visible" }} preserveWhitespace>
                    This toast is visible only on this page.
                    <Button icon="close" dismiss mod="hollow"/>
                </Toast>

                <Toast visible={{ bind: "$page.complex.visible" }} preserveWhitespace>
                    <div preserveWhitespace>
                        <TextField value={{ bind: "$page.name" }} label="Quick Reply:" />
                        <Button icon="envelope-o" dismiss disabled={{ expr: "{$page.name} == null" }}>Send</Button>
                        <Button icon="close" dismiss />
                    </div>
                </Toast>
            </Section>
        </FlexRow>
    </div>
</cx>);









