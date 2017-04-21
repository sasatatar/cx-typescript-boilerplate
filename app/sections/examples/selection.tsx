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
    Option,
    Grid
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller, PropertySelection, KeySelection} from "cx/ui";
import { Rectangle, Svg } from "cx/svg";
import { BubbleGraph, Chart, Gridlines, NumericAxis, ScatterGraph } from "cx/charts";



class PageController extends Controller {
   init() {
      super.init();

      this.store.set('$page.bubbles', Array.from({length: 15}).map((v, i)=>({
         name: `Bubble ${i+1}`,
         x: Math.random() * 100,
         y: Math.random() * 100,
         d: Math.random() * 40,
         selected: i % 2 == 0
      })));
   }
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

register('Selection', 'Other examples', <cx>
    <h2 putInto="header">Selection</h2>
    <div class="example pad wrap">
        <FlexRow wrap spacing="large">
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div class="widgets" controller={PageController}>
                    <Svg style={{ width: "400px", height: "400px" }}>
                        <Chart anchors="0 1 1 0" offset="25 -25 -40 50" axes={NumericAxis.XY()}>
                            <Rectangle
                                anchors="0 1 1 0"
                                style={{ fill: "rgba(100, 100, 100, 0.1)" }}
                            />
                            <Gridlines />
                            <ScatterGraph
                                data={{ bind: "$page.bubbles" }}
                                selection={{ type: PropertySelection, multiple: true }}
                                sizeField="d"
                                colorIndex={0}
                            />
                        </Chart>
                    </Svg>
                    <div>
                        <Repeater records={{ bind: "$page.bubbles" }}>
                            <div>
                                <Checkbox
                                    checked={{ bind: "$record.selected" }}      
                                    text={{ bind: "$record.name" }}
                                />
                            </div>
                        </Repeater>
                    </div>
                </div>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Grid records={{ bind: "$page.bubbles" }}
                style={{width: "400px"}}
                columns={[
                    { header: 'Name', field: 'name', sortable: true },
                    { header: 'X', field: 'x', sortable: true, format: 'n;2', align: "right" },
                    { header: 'Y', field: 'y', sortable: true, format: 'n;2', align: "right" },
                    { header: 'R', field: 'r', sortable: true, format: 'n;2', align: "right" }
                ]}
                selection={{type: KeySelection, keyField: 'name', bind: '$page.selection'}}
                />
                <div>
                    <Select value={{ bind: "$page.selection" }}>
                        <Repeater records={{ bind: "$page.bubbles" }}>
                            <Option value={{ bind: "$record.name" }} text={{ bind: "$record.name" }}/>
                        </Repeater>
                    </Select>
                </div>
            </Section>
        </FlexRow>
    </div>
</cx>);









