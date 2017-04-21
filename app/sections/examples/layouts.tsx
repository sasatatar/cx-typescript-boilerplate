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
    LabeledContainer,
    PureContainer,
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller, UseParentLayout} from "cx/ui";


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

register('Layouts', 'Other examples', <cx>
    <h2 putInto="header">Layouts</h2>
    <div class="example pad wrap">
        <FlexRow wrap spacing="large">
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div trimWhitespace={false}>
                    First some text.
                    <TextField value={{ bind: "$page.text" }} label="Label 1" />
                    <Checkbox value={{ bind: "$page.check" }} label="Label 2">Checkbox</Checkbox>
                </div>    
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div layout={LabelsLeftLayout}>
                    First some text.
                    <TextField value={{ bind: "$page.text" }} label="Label 1" />
                    <Checkbox value={{ bind: "$page.check" }} label="Label 2">Checkbox</Checkbox>
                    <LabeledContainer label="Label 3" trimWhitespace={false}>
                        <TextField value={{ bind: "$page.text" }}/>
                        <TextField value={{ bind: "$page.text" }}/>
                    </LabeledContainer>
                </div>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div>
                    <div layout={LabelsTopLayout}>
                        <Select value={{ bind: "$page.title" }} label="Title" style={{width: "70px"}}>
                            <option value="Mr">Mr.</option>
                            <option value="Mrs">Mrs.</option>
                        </Select>
                        <TextField value={{ bind: "$page.firstName" }} label="Name" placeholder="First Name" style={{width: '150px'}} />
                        <TextField value={{ bind: "$page.lastName" }} placeholder="Last Name" style={{width: '150px'}}/>
                    </div>
                    <div layout={LabelsTopLayout}>
                        <TextField value={{ bind: "$page.street" }} label="Address" placeholder="Street" style={{width: '150px'}} />
                        <TextField value={{ bind: "$page.city" }} placeholder="City" style={{width: '150px'}}/>
                        <TextField value={{ bind: "$page.zip" }} placeholder="Zip" style={{width: '70px'}}/>
                    </div>
                </div>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div layout={{ type: LabelsTopLayout, vertical: true }}>
                    <Select value={{ bind: "$page.title" }} label="Title" style={{width: "70px"}}>
                        <option value="Mr">Mr.</option>
                        <option value="Mrs">Mrs.</option>
                    </Select>
                    <TextField value={{ bind: "$page.firstName" }} label="Name" placeholder="First Name"
                        style={{width: '150px'}}/>
                    <TextField value={{ bind: "$page.lastName" }} placeholder="Last Name" style={{width: '150px'}}/>
                </div>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div layout={LabelsLeftLayout}>
                    <Checkbox value={{ bind: "$page.showSection1" }}>Section 1</Checkbox>
                    <PureContainer layout={UseParentLayout} visible={{ bind: "$page.showSection1" }}>
                        <TextField value={{ bind: "$page.text" }} label="Label 1"/>
                        <TextField value={{ bind: "$page.text" }} label="Label 2"/>
                        <Checkbox value={{ bind: "$page.showSection2" }}>Section 2</Checkbox>
                        <PureContainer layout={UseParentLayout} visible={{ bind: "$page.showSection2" }}>
                            <TextField value={{ bind: "$page.text" }} label="Label 3"/>
                            <TextField value={{ bind: "$page.text" }} label="Label 4"/>
                        </PureContainer>
                    </PureContainer>
                </div>
            </Section>

        </FlexRow>
    </div>
</cx>);









