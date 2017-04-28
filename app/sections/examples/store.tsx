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
    Sandbox,
    Rescope
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller} from "cx/ui";
import { Chart, Gridlines, Legend, LineGraph, NumericAxis } from "cx/charts";
import { Rectangle, Svg } from "cx/svg";

function loadCulture(culture) {
    //code-splitting - it's mandatory to use string constants so webpack can know how to prepare packages
    switch (culture) {
        case 'de-de':
            return System.import('cx/locale/de-de');

        default:
        case 'en-us':
            return System.import('cx/locale/en-us');
    }
}

function setCulture(culture, store) {
    loadCulture(culture)
        .then(() => {
            Culture.setCulture(culture);
            store.notify();//force re-render
        });
}

class PageController extends Controller {
    init() {
        super.init();
                
        this.store.init('$page.number', 123456.78);
        this.store.init('$page.date', new Date().toISOString());
        this.store.set("intro.core.items", [
          { text: "A", checked: false },
          { text: "B", checked: false },
          { text: "C", checked: false }
        ]);
        this.store.set('intro.core.letterCount', '');
    }
    greet() {
        let name = this.store.get('$page.name')
        MsgBox.alert(`Hello, ${name}!`);
    }
}

register('Store', 'Other examples', <cx>
    <h2 putInto="header">Store</h2>
    <div class="example pad wrap">
        <h3>Store</h3>
        <FlexRow wrap spacing="large">
            <Section mod="well" header={{ level: 5, text: 'Counter'}} layout={{type: LabelsTopLayout, vertical: true}}>
                <div layout={LabelsTopLayout} controller={PageController}>
                  <NumberField
                    label="Count"
                    value={{ bind: "$page.count" }}
                    style="width: 50px"
                  />
                  <Button
                    onClick={(e, { store }) => {
                        store.update("$page.count", count => count + 1);
                      }}
                  >
                    +1
                  </Button>
                </div>
            </Section>
            <Section mod="well">
                <Checkbox value={{ bind: 'intro.core.checked' }}>Checkbox</Checkbox>
                <TextField value={{ bind: 'intro.core.text' }}
                      enabled={{ expr: '!{intro.core.checked}' }}/>
            </Section>
            <Section mod="well">
                <div layout={LabelsTopLayout}>
                    <TextField value={{ bind: "$page.name" }} label="Name" />
                    <Button onClick={(e, {store}) =>
                        store.delete('$page.name')
                    }>
                        Clear
                    </Button>
                </div>
            </Section>
            <Section mod="well">
                <div layout={LabelsTopLayout} >
                    <TextField label="Name" value={{ bind: "$page.name" }} disabled={{ bind: "$page.disabled" }} />
                    <Button onClick={(e, instance) => {
                            let {store} = instance;
                            store.set("$page.disabled", !store.get("$page.disabled"));
                        }}
                        text={computable('$page.disabled', (disabled) => disabled ? "Enable input" : "Disable input")}   
                    />
                </div>
            </Section>
            <Section mod="well">
                <div layout={LabelsTopLayout}>
                    <TextField label="Origin" value={{ bind: "$page.name" }}/>
                    <TextField label="Destination" value={{ bind:"$page.copyDestination" }} placeholder="click Copy" />
                    <Button onClick={(e, {store}) => {
                        store.copy('$page.name', '$page.copyDestination');    
                    }}>Copy</Button>
                </div>
            </Section>
            <Section mod="well">
                <div>
                    <div preserveWhitespace>
                        <Radio value={{bind: "$page.place", defaultValue: "winner"}} option="winner">Winner</Radio>
                        <Radio value={{ bind: "$page.place" }} option="second">2nd Place</Radio>
                        <Radio value={{ bind: "$page.place" }} option="third">3rd Place</Radio>
                    </div>
                    <hr/>
                    <Sandbox key={{ bind: "$page.place" }} storage={{ bind: "$page.results" }} recordName="$contestant">
                        <div layout={LabelsLeftLayout}>
                            <TextField value={{ bind: "$contestant.firstName" }} label="First Name"/>
                            <TextField value={{ bind: "$contestant.lastName" }} label="Last Name"/>
                        </div>
                    </Sandbox>
                </div>
                <div style="width:200px">
                    <strong>Results</strong>
                    <Rescope bind="$page.results">
                        <div>
                            1. <Text tpl="{winner.firstName} {winner.lastName}" />
                        </div>
                        <div>
                            2. <Text tpl="{second.firstName} {second.lastName}" />
                        </div>
                        <div>
                            3. <Text tpl="{third.firstName} {third.lastName}" />
                        </div>
                    </Rescope>
                </div>
            </Section>
            <Section mod="well">
                <div layout={LabelsTopLayout}>
                    <TextField label="Origin" value={{ bind: "$page.name" }}/>
                    <TextField label="Destination" value={{ bind: "$page.moveDestination" }} placeholder="click Move" />
                    <Button onClick={(e, {store}) => {
                        store.move('$page.name', '$page.moveDestination'); 
                    }}>Move</Button>
                </div>
            </Section>
            <Section mod="well">
               <div class="widgets">
                    <div layout={LabelsLeftLayout}>
                        <strong>Todo List</strong>
                        <Repeater records={{ bind: "$page.todoList"}}>
                            <Checkbox value={{ bind: "$record.done" }} text={{ bind: "$record.text" }}/>
                            <br />
                        </Repeater>
                        <Button
                            onClick={(e, { store }) => {
                                store.update(
                                    "$page.todoList",
                                    updateArray,
                                    item => ({
                                        ...item,
                                        done: true
                                    }),
                                    item => !item.done
                                );
                            }}
                        >
                            Mark all as done
                        </Button>
                    </div>
                </div>
            </Section>
            <Section mod="well">
                 <div layout={LabelsLeftLayout}>
                    <TextField value={{ bind: 'intro.core.firstName' }} label="First Name" />
                    <TextField value={{ bind: 'intro.core.lastName' }} label="Last Name"/>
                    <TextField value={{ tpl: 'Hello {intro.core.firstName} {intro.core.lastName}!' }} label="Template" mode="view"/>
                    <TextField value={{ expr: '"Hello "+{intro.core.firstName:s}+" "+{intro.core.lastName:s}+"!"' }} label="Expression" mode="view"/>
                </div>
            </Section>
            <Section mod="well">
                <div preserveWhitespace>
                    <NumberField value={{ bind: 'intro.core.a' }} placeholder="A" />
                    +
                    <NumberField value={{ bind:'intro.core.b' }} placeholder="B" />
                    =
                    <Text value={computable('intro.core.a', 'intro.core.b', (a, b) => a==null || b==null ? "ERR" : a + b )} />
                 </div>
            </Section>
            <Section mod="well">
                <div preserveWhitespace>
                    A + 2 = <NumberField style="width:50px"
                                        value={{
                                            expr: '{intro.core.a}+2',
                                            set: (value, {store}) => { store.set('intro.core.a', value - 2) }
                                        }}/>
                    <br/>
                    A = <Text bind="intro.core.a" />
                </div>
            </Section>
          
            <Section mod="well" title="Direct">
                <Slider value={{ bind: "$page.slider.direct" }}/>
                <Slider value={{ bind: "$page.slider.direct" }}/>
            </Section>
            <Section mod="well" title="Throttle: 300ms">
                <Slider value={{ bind: "$page.slider.throttled" , throttle: 300  }}/>
                <br />
                <Slider value={{ bind: "$page.slider.throttled", throttle: 300 }} />
            </Section>
            <Section mod="well" title="Debounce: 300ms">
                <Slider value={{ bind: "$page.slider.debounced", debounce: 300 }} />
                <br />
                <Slider value={{ bind: "$page.slider.debounced", debounce: 300 }} />
            </Section>

           
        </FlexRow>
        <h3 style={{marginTop: "3rem"}}>Standalone</h3>

        <FlexRow wrap spacing="large">

            <Section mod="well" header={{ level: 4, text: "Calendar"}} layout={{type: LabelsTopLayout, vertical: true}}>
                <Calendar value={{ bind: "date" }}/>
            </Section>

            <Section mod="well" header={{ level: 4, text: "MonthPicker"}}
                     layout={{type: LabelsTopLayout, vertical: true}}>
                <MonthPicker
                    range
                    from={{ bind: "dateFrom" }}
                    to={{ bind: "dateTo" }}
                    style="height:21rem"
                />
            </Section>
            <Section mod="well">
                <div class="widgets" controller={PageController}>
                    <div preserveWhitespace>
                        <Button onClick={(e, {store}) => {setCulture('de-de', store)}}>de-de</Button>
                        <Button onClick={(e, {store}) => {setCulture('en-us', store)}}>en-us</Button>
                    </div>
                    <div layout={LabelsLeftLayout}>
                        <NumberField value={{ bind: "$page.number" }} required />
                        <DateField value={{ bind: "$page.date" }} required />
                        <NumberField value={{ bind: "$page.number" }} required format="currency"/>
                        <Calendar value={{ bind: "$page.date" }}/>
                    </div>
                </div>
            </Section>
            <Section mod="well" header={{ level: 4, text: "ColorPicker"}}
                layout={{type: LabelsTopLayout, vertical: true}}>
                <ColorPicker value={{ bind: "color" }}/>
            </Section>
            <Section mod="well">
                <Svg style="width:300px;height:200px" margin="10 20 30 50">
                    <Chart axes={{
                        x: <NumericAxis />,
                        y: <NumericAxis vertical/>
                    }}>
                        <Rectangle fill="white" />
                        <Gridlines />
                        <LineGraph name="Line 1"
                                    colorIndex={5}
                                    data={[{x: 0, y: 0}, {x: 100, y: 100}, {x: 200, y: 150}]} />

                        <LineGraph name="Line 2"
                                    colorIndex={10}
                                    data={[{x: 0, y: 50}, {x: 100, y: 150}, {x: 200, y: 100}]} />
                    </Chart>
                </Svg>
                <Legend vertical />
            </Section>
            <Section mod="well">
                <Repeater records={{ bind: "intro.core.items" }}>
                    <Checkbox value={{ bind: "$record.checked" }} text={{ bind: "$record.text" }}/>
                    <br/>
                </Repeater>

                You checked <Text value={{ expr: '{intro.core.items}.filter(a=>a.checked).length' }}/> item(s).
            </Section>
            <Section mod="well">
                <TextField value={{ bind: 'intro.core.letterCount' }} placeholder="Type here" />
                <p>
                <Text value={(storeData) => `You typed letter A
                ${((storeData.intro.core.letterCount || '').match(/A/g) || []).length} times.` } />
                </p>
            </Section>
        </FlexRow>
    </div>
</cx>);









