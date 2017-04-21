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
    Slider
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

register('Forms and Grids', 'Other examples', <cx>
    <h2 putInto="header">Forms and Grids</h2>
    <div class="example pad wrap">
            <FlexRow wrap spacing="large">           
                 <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <TextField label="Standard" value={{ bind: "$page.text" }} autoFocus/>
                        <TextField label="Disabled" value={{ bind: "$page.text" }} disabled/>
                        <TextField label="Readonly" value={{ bind: "$page.text" }} readOnly/>
                        <TextField label="Placeholder" value={{ bind: "$page.text" }} placeholder="Type something here..."/>
                        <TextField label="Tooltip" value={{ bind: "$page.text" }} tooltip='This is a tooltip.'/>
                    </div>
                    <div layout={LabelsLeftLayout}>
                        <TextField label="Required" value= {{ bind: "$page.text" }} required/>
                        <TextField label="Min/Max Length" value={{ bind: "$page.text" }} minLength={3} maxLength={8}/>
                        <TextField label="Styled" value={{ bind: "$page.text" }} 
                            inputStyle={{border: '1px solid green'}} 
                            icon="search" 
                            showClear />
                        <TextField label="View" value={{ bind: "$page.text" }} mode="view"/>
                        <TextField label="EmptyText" value={{ bind: "$page.text" }} mode="view" emptyText="N/A"/>
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <NumberField label="Standard" value={{ bind: "$page.number" }} autoFocus />
                        <NumberField label="Disabled" value={{ bind: "$page.number" }} disabled />
                        <NumberField label="Readonly" value={{ bind: "$page.number" }} readOnly />
                        <NumberField
                            label="Placeholder"
                            value={{ bind: "$page.number" }}
                            placeholder="Type something here..."
                        />
                        <NumberField
                            label="Validation"
                            value={{ bind: "$page.number" }}
                            minValue={18}
                            placeholder="Above 18..."
                        />
                        <NumberField
                            label="Currency"
                            value={{ bind: "$page.number" }}
                            placeholder="EUR"
                            format="currency;EUR"
                        />
                        <NumberField
                            label="Currency"
                            value={{ bind: "$page.number" }}
                            placeholder="USD"
                            format="currency;USD"
                        />
                        <NumberField label="Formatted" value={{ bind: "$page.number" }} format="n;2" />
                        <NumberField label="Percentage" value={{ bind: "$page.number" }} format="ps" />
                        <NumberField
                            label="Suffix"
                            value={{ bind: "$page.number" }}
                            format="suffix; kg"
                        />
                        <NumberField label="Required" value={{ bind: "$page.number" }} required />
                        <NumberField
                            label="Styled"
                            value={{ bind: "$page.number" }}
                            inputStyle={{ border: "1px solid green" }}
                        />
                        <NumberField label="View" value={{ bind: "$page.number" }} mode="view" />
                        <NumberField
                            label="EmptyText"
                            value={{ bind: "$page.number" }}
                            mode="view"
                            emptyText="N/A"
                        />
                    </div>
                </Section>
            </FlexRow>
    </div>
</cx>);









