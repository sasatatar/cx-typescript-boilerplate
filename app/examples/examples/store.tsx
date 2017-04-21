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
    Repeater
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

register('Store', 'Other examples', <cx>
    <h2 putInto="header">Form Fields</h2>
    <div class="example pad wrap">
        <h3>Fields</h3>
        <FlexRow wrap spacing="large">
            <Section mod="well" header={{ level: 5, text: 'Storee'}} layout={{type: LabelsTopLayout, vertical: true}}>
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

            <Section mod="well" header={{ level: 4, text: "ColorPicker"}}
                     layout={{type: LabelsTopLayout, vertical: true}}>
                <ColorPicker value={{ bind: "color" }}/>
            </Section>
        </FlexRow>
    </div>
</cx>);









