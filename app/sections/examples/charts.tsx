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
    Text,
    Slider
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller, KeySelection, Repeater} from "cx/ui";
import {Chart, Gridlines, NumericAxis, PieChart, PieSlice, Legend, ColorMap, LineGraph} from 'cx/charts';
import {Rectangle, Svg, Line} from "cx/svg";


class PageController extends Controller {
   
   init() {
      super.init();

      // $piechart
      var value = 100;
      this.store.set('$piechart.points', Array.from({length: 7}, (_, i) => ({
         id: i,
         name: 'Item ' + (i+1),
         value: value = (value + (Math.random() - 0.5) * 30),
      })));

      // LineGraph
      var y1 = 150, y2 = 250;
      this.store.set('$linegraph.points', Array.from({length: 101}, (_, i) => ({
         x: i * 4,
         y: i % 20 == 3 ? null : (y1 = (y1 + (Math.random() - 0.5) * 30)),
         y2: y2 = (y2 + (Math.random() - 0.5) * 30),
         y2l: y2 - 50,
         y2h: y2 + 50
      })));
   }
}

register('Charts', 'Other examples', <cx>
    <h2 putInto="header">Charts</h2>
    <div class="example pad wrap">
        <FlexRow wrap spacing="large">
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Svg style="width:300px;height:200px" margin="10 20 30 50">
                    <Chart axes={{
                        x: <NumericAxis />,
                        y: <NumericAxis vertical/>
                    }}>
                        <Rectangle fill="white" />
                        <Gridlines />
                    </Chart>
                </Svg>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
               <div class="widgets" controller={PageController}>
                  <Legend.Scope>
                     <Legend />
                     <div>
                        <Svg style="width:600px; height:400px;">
                           <ColorMap />
                           <PieChart angle={360}>
                              <Repeater records={{ bind: "$piechart.points"}}>
                                 <PieSlice value={{ bind: '$record.value'}}
                                          active={{ bind: '$record.active' }}
                                          colorMap="pie"
                                          r= {{ expr: '80' }}
                                          r0= {{ expr: '20' }}
                                          offset={5}
                                          tooltip={{
                                             text: {
                                                   tpl: "Item {$index}: {$record.value:n;2}"
                                             },
                                             trackMouse: true
                                          }}
                                          innerPointRadius={80}
                                          outerPointRadius={90}
                                          name={{ tpl: "Item {$index}" }}
                                          selection={{
                                             type: KeySelection,
                                             bind: '$piechart.selection',
                                             records: {bind: '$piechart.points'},
                                             record: {bind: '$record'},
                                             index: {bind: '$index'},
                                             keyField: 'id'
                                          }}>
                                       <Line style="stroke:gray" />
                                       <Rectangle anchors='1 1 1 1' offset="-10 20 10 -20" style="fill:white">
                                          <Text tpl="{$record.value:n;1}" dy="0.4em" ta="middle" />
                                       </Rectangle>
                                    </PieSlice>
                              </Repeater>
                           </PieChart>
                        </Svg>
                     </div>
                  </Legend.Scope>
               </div>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <div class="widgets" controller={PageController}>
                  <Legend.Scope>
                     <Svg style="width:600px; height:400px;">
                         <Chart offset="20 -10 -40 40" axes={{ x: { type: NumericAxis }, y: { type: NumericAxis, vertical: true } }}>
                             <Gridlines/>
                             <LineGraph data={{ bind: "$linegraph.points" }} colorIndex={8} yField="y2h" y0Field="y2l" active={{ bind: "$linegraph.line2" }} line={false} area/>
                             <LineGraph name="Line 1" data={{ bind: "$linegraph.points" }} colorIndex={0} area active={{ bind: "$linegraph.line1" }}/>
                             <LineGraph name="Line 2" data={{ bind: "$linegraph.points" }} colorIndex={8} yField="y2" active={{ bind: "$linegraph.line2" }}/>
                         </Chart>
                     </Svg>
                     <Legend />
                  </Legend.Scope>
              </div>
           </Section>
        </FlexRow>
    </div>
</cx>);

/*

           */









