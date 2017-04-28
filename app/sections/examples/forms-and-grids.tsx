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
    LookupFieldProps,
    List,
    ValidationGroup,
    FieldGroup,
    LabeledContainer,
    Switch,
    ValidationError,
    Icon
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller, PropertySelection, FirstVisibleChildLayout} from "cx/ui";


class PageController extends Controller {
    init() { 
       super.init();
       
       this.store.init('$page.records', Array.from({length: 5}, (x, i)=>({
              text: `${i+1}`
            })));
       this.store.init('$page', { 
            records: Array.from({length: 5}, (x, i)=>({
              text: `${i+1}`
            })),
            options5: Array.from({length: 5}).map((v, i)=>({ id: i, text: `Option ${i+1}`})),
            options10: Array.from({length: 10}).map((v, i)=>({ id: i, text: `Option ${i+1}`}))
          }
       );
    }

    query(q) {
       //fake data
       if (!this.cityDb)
          this.cityDb = Array.from({ length: 100 }).map((_, i) => ({ id: i, text: casual.city }));

       var regex = new RegExp(q, 'gi');
       return new Promise((resolve) => {
          setTimeout(()=> resolve(this.cityDb.filter(x=>x.text.match(regex))), 100);
       });
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
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <Checkbox label="Native" value={{ bind: "$page.checked" }} text="Checkbox" native/>
                        <Checkbox label="Standard" value={{ bind: "$page.checked" }} text="Checkbox" />
                        <Checkbox label="Disabled" value={{ bind: "$page.checked" }} disabled text="Checkbox" />
                        <Checkbox label="Readonly" value={{ bind: "$page.checked" }} readOnly text="Checkbox" />
                    </div>
                    <div layout={LabelsLeftLayout}>
                        <Checkbox label="Required" value={{ bind: "$page.checked" }} required text="Checkbox"/>
                        <Checkbox label="Styled" value={{ bind: "$page.checked" }} inputStyle="color:red" text="Checkbox"/>
                        <Checkbox label="View" value={{ bind: "$page.checked" }} mode="view" text="Checkbox" emptyText="N/A" />
                        <Checkbox label="Three State" value={{ bind: "$page.checked2" }} text="Checkbox" indeterminate />
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <Radio label="Native" value={{ bind: "$page.option" }} option="0" text="Radio" native/>
                        <Radio label="Standard" value={{ bind: "$page.option" }} option="1" text="Radio"/>
                        <Radio label="Disabled" value={{ bind: "$page.option" }} option="2" disabled text="Radio"/>
                    </div>
                    <div layout={LabelsLeftLayout}>
                        <Radio label="Required" value={{ bind: "$page.option" }} option="4" required text="Radio"/>
                        <Radio label="Readonly" value={{ bind: "$page.option" }} option="3" readOnly text="Radio"/>
                        <Radio label="Styled" value={{ bind: "$page.option" }} option="5" inputStyle="color:red" text="Radio"/>
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <DateField label="Standard" value={{ bind: "$page.date" }} format="yyyyMMMMdd" autoFocus/>
                        <DateField label="Disabled" value={{ bind: "$page.date" }} disabled />
                        <DateField label="Readonly" value={{ bind: "$page.date" }}readOnly />
                        <DateField label="Placeholder" value={{ bind: "$page.date" }} placeholder="Type something here..." />
                    </div>
                    <div layout={LabelsLeftLayout}>
                        <DateField label="Required" value={{ bind: "$page.date" }} />
                        <DateField label="Styled" value={{ bind: "$page.date" }} inputStyle={{border: '1px solid green'}} icon="clock-o"/>
                        <DateField label="View" value={{ bind: "$page.date" }} mode="view" />
                        <DateField label="EmptyText" value={{ bind: "$page.date" }} mode="view" emptyText="N/A" />
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div class="widgets">
                        <Calendar value={{ bind: "$page.date" }}/>
                        <Calendar value={{ bind: "$page.date" }}
                                minValue="2016-05-10"
                                maxValue="2016-05-20"
                                maxExclusive
                                refDate="2016-05-08" />
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <MonthField range from={{ bind: "$page.from" }} to={{ bind: "$page.to" }} label="Range" autoFocus/>
                        <MonthField value={{ bind: "$page.date" }} label="Single"/>
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <TextArea label="Standard" value={{ bind: "$page.text" }} rows={5} autoFocus />
                        <TextArea label="Disabled" value={{ bind: "$page.text" }} disabled />
                        <TextArea label="Readonly" value={{ bind: "$page.text" }} readOnly />
                        <TextArea label="Placeholder" value={{ bind: "$page.text" }} placeholder="Type something here..." />
                        <TextArea label="Tooltip" value={{ bind: "$page.text" }} tooltip='This is a tooltip.' />
                        <TextArea label="Required" value= {{ bind: "$page.text" }} required />
                        <TextArea label="Styled" value={{ bind: "$page.text" }} inputStyle={{border: '1px solid green'}} />
                        <TextArea label="View" value={{ bind: "$page.text" }} mode="view" />
                        <TextArea label="EmptyText" value={{ bind: "$page.text" }} mode="view" emptyText="N/A" />
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <Select value= {{ bind: "$page.selection" }} label="Standard">
                            <option value={1}>Option 1</option>
                            <option value={2}>Option 2</option>
                        </Select>
                        <Select value= {{ bind: "$page.selection" }} label="Disabled" disabled>
                            <option value={1}>Option 1</option>
                            <option value={2}>Option 2</option>
                        </Select>
                        <Select value= {{ bind: "$page.selection" }} label="Required" required>
                            <option />
                            <option value={1}>Option 1</option>
                            <option value={2}>Option 2</option>
                        </Select>
                        </div>
                        <div layout={LabelsLeftLayout}>
                        <Select value={{ bind: "$page.selection" }} label="Tooltip" tooltip="Tooltip">
                            <option value={1}>Option 1</option>
                            <option value={2}>Option 2</option>
                        </Select>
                        <Select value= {{ bind: "$page.selection" }} label="Styled" inputStyle={{border: '1px solid green'}} icon="pencil">
                            <option value={1}>Option 1</option>
                            <option value={2}>Option 2</option>
                        </Select>
                        <Select value={{ bind: "$page.selection2" }} label="Clear" emptyValue={null} placeholder="Please select...">
                            <option value={1}>Option 1</option>
                            <option value={2}>Option 2</option>
                        </Select>
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div class="widgets" controller={PageController}>
                        <div layout={LabelsLeftLayout}>
                            <LookupField
                                label="Select"
                                value= {{ bind: "$page.s5.id" }}
                                text= {{ bind:"$page.s5.text" }}
                                options={{ bind: "$page.options5" }}/>
                            <LookupField
                                label="MultiSelect"
                                records={{ bind: "$page.s10" }}
                                options={{ bind: "$page.options10" }}
                                multiple/>
                            <LookupField
                                label="Records"
                                values={{ bind: "$page.s10ids" }}
                                options= {{ bind:"$page.options10" }}
                                multiple/>
                        </div>
                        <div layout={LabelsLeftLayout}>
                            <LookupField
                                label="Remote Data"
                                records={{ bind: "$page.selectedCities" }}
                                onQuery="query"
                                multiple/>
                            <LookupField
                                label="Local Filter"
                                records={{ bind: "$page.selectedCities2" }}
                                onQuery="query"
                                fetchAll
                                cacheAll
                                multiple
                                icon="filter"
                                closeOnSelect={false} />
                            <LookupField
                                label="Select"
                                value={{ bind: "$page.s5.id" }}
                                text= {{ bind: "$page.s5.text" }}
                                icon="pencil"
                                options={{ bind: "$page.options5" }}/>
                        </div>
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <List records={{ bind: "$page.records" }}
                        selection={PropertySelection}
                        style="width:200px"
                        emptyText="Nothing found."
                        mod="bordered">
                        <div>
                            <strong>Header <Text expr="{$index}+1" /></strong>
                        </div>
                        Description
                    </List>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div class="widgets">
                            <ColorField value={{bind:"$page.color1", defaultValue:'#f88'}} autoFocus />
                            <div style={{width:'100px', height: '70px', background:{bind:'$page.color1'}}}></div>
                        </div>

                        <div class="widgets">
                            <ColorField value={{bind:"$page.color2", defaultValue: 'hsla(360, 40%, 40%, 1)'}} format='hsla'/>
                            <div style={{width:'100px', height: '70px', background:{bind:'$page.color2'}}}></div>
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div class="widgets">
                        <ColorPicker value={{ bind: "$page.color" }}/>
                        <div style={{width:'100px', height: '70px', background:{bind:'$page.color'}}}></div>
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                   <div layout={LabelsLeftLayout}>
                        <Slider label="Standard" value={{ bind: "$page.to" }} tooltip={{
                            text:{tpl: '{$page.to:n;2}' },
                            placement: 'up'
                        }} />
                        <Slider label="Stepped" from={{ bind: "$page.from" }} step={10} />
                        <Slider label="Range" from={{ bind: "$page.from" }} to={{ bind: "$page.to" }}/>
                        <Slider label="Disabled" from={{ bind: "$page.from" }} to={{ bind: "$page.to" }} disabled />
                    </div>
                    <Slider vertical from={{ bind: "$page.from" }} to={{ bind: "$page.to" }} step={10} rangeStyle="background:lightsteelblue"/>
                    <Slider vertical from={{ bind: "$page.from" }} to={{ bind: "$page.to" }} rangeStyle="background:lightgreen"/>
                    <Slider vertical from={{ bind: "$page.from" }} to={{ bind: "$page.to" }} rangeStyle="background:lightyellow"/>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                   <div layout={LabelsLeftLayout}>
                        <TextField label="Standard" value={{ bind: "$page.text" }} autoFocus/>
                        <TextField label={{text: "Styled", style: "color:green;font-weight:bold"}} value={{ bind: "$page.text" }}/>
                        <TextField label="Asterisk" value={{ bind:"$page.text" }} required asterisk />
                        <TextField
                            label={<Checkbox value={{ bind: "$page.enabled" }}>Enabled</Checkbox>}
                            value={{ bind: "$page.text" }}
                            enabled={{ bind: "$page.enabled" }}
                        />
                        <TextField
                            label={{
                                text: 'Tooltips',
                                tooltip: 'This tooltip is related to the label.'
                            }}
                            value={{ bind: "$page.text" }}
                            tooltip="This tooltip is related to the field."
                        />
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                       <div class="widgets" style={{
                            borderLeftWidth: '3px',
                            borderLeftStyle: 'solid',
                            borderLeftColor: { expr: '{$page.valid} ? "lightgreen" : "red"' }
                        }}>
                        <ValidationGroup layout={LabelsLeftLayout} valid={{ bind: "$page.valid" }}>
                            <TextField label="First Name" value={{ bind: "$page.firstName" }} required />
                            <TextField label="Last Name" value={{ bind: "$page.lastName" }} required />
                        </ValidationGroup>
                        </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <Checkbox value={{ bind: "$page.active" }}>Active</Checkbox>
                    <FieldGroup layout={LabelsLeftLayout} enabled={{ bind: "$page.active" }}>
                        <TextField label="First Name" value={{ bind: "$page.firstName" }} required/>
                        <TextField label="Last Name" value={{ bind: "$page.lastName" }} required/>
                    </FieldGroup>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <LabeledContainer label="Name" trimWhitespace={false}>
                            <TextField value={{ bind: "$page.person.firstName" }} placeholder="First Name" />
                            <TextField value={{ bind: "$page.person.lastName" }} placeholder="Last Name" />
                        </LabeledContainer>
                        <LabeledContainer label="Origin" trimWhitespace={false}>
                            <DateField value={{ bind: "$page.person.dob" }} placeholder="DOB" />
                            <TextField value={{ bind: "$page.person.country" }} placeholder="Country" />
                        </LabeledContainer>
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <div layout={LabelsLeftLayout}>
                        <Switch label="Default" on={{ bind: "$page.check" }} text={{ expr: "{$page.check} ? 'ON' : 'OFF'" }}/>
                        <Switch label="Disabled" value={{ bind: "$page.check" }} disabled/>
                        <Switch label="Read-only" off={{ bind: "$page.check" }} readOnly/>
                        <Switch
                            label="Styled"
                            off={{ bind: "$page.check" }}
                            handleStyle="background:white"
                            rangeStyle="background:lightsteelblue"
                        >
                            <span style="color:red">Label</span>
                        </Switch>
                    </div>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <TextField
                        label="Name"
                        value={{ bind: "$page.default" }}
                        placeholder="Required"
                        required
                    />
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <TextField label="Asterisk" value= {{ bind: "$page.asterisk" }} placeholder="Required" required asterisk />
                    <TextField label="Visited" value={{ bind: "$page.visited" }} placeholder="Required" required visited />
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <TextField
                        label="Help"
                        value={{ bind: "$page.help" }}
                        help={<span style="font-size:smaller">Help text</span>}
                    />
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <ValidationGroup layout={LabelsLeftLayout}>
                        <TextField label="Help" value={{ bind: "$page.help2" }} help={<Button icon="calculator" mod="hollow"/>}
                        />
                        <TextField label="Help" value={{ bind: "$page.help2" }} required visited help={ValidationError}
                        />
                    </ValidationGroup>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <ValidationGroup layout={LabelsLeftLayout}>
                        <TextField label="Help" value={{ bind: "$page.help3" }} required visited
                            minLength={5} validationMode="help" />

                        <TextField label="Help Block" value={{ bind: "$page.help4" }} required visited
                            minLength={5} validationMode="help-block" />
                    </ValidationGroup>
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <TextField
                        label="Favorite framework?" value={{ bind: "$page.framework" }}
                        validationMode="help-block" reactOn="enter blur"
                        onValidate={(v) => {
                            if (v != 'Cx')
                                return 'Oops, wrong answer!'
                        }}
                    />
                </Section>
                <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                    <ValidationGroup layout={LabelsTopLayout}>
                        <TextField
                            label="Username"
                            value={{ bind: "$page.form.username" }}
                            required visited
                            onValidate={
                                v => new Promise(fulfill => {
                                    setTimeout(() => {
                                        fulfill(v == 'cx' ? "This name is taken." : false);
                                    }, 500)
                                })
                            }
                            help={
                                <div layout={FirstVisibleChildLayout}>
                                    <ValidationError />
                                    <Icon name="check" style="color:green"/>
                                </div>
                            }
                        />
                    </ValidationGroup>
                </Section>
            </FlexRow>
    </div>
</cx>);









