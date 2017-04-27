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
import {Chart, Gridlines, NumericAxis, PieChart, PieSlice, Legend, ColorMap, LineGraph, ScatterGraph, Marker} from 'cx/charts';
import {Rectangle, Svg, Line} from "cx/svg";


class PageController extends Controller {
   
   init() {
      super.init();

      // PieChart
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
      
      // ScatterGraph
      // Marker
      this.store.set('$page.reds', Array.from({length: 50}, (_, i) => ({
         x: 100+Math.random() * 300,
         y: Math.random() * 300,
         size: 10 + Math.random() * 30,
         color: Math.floor(Math.random() * 3)
      })));
      this.store.set('$page.blues', Array.from({length: 50}, (_, i) => ({
         x: Math.random() * 300,
         y: 100 + Math.random() * 300,
         size: 10 + Math.random() * 30,
         color: 4 + Math.floor(Math.random() * 3)
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
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <div class="widgets" controller={PageController}>
                  <Svg style="width:500px; height:400px;">
                     <Chart offset="20 -20 -40 130" axes={{
                        x: { type: NumericAxis, snapToTicks: 1 },
                        y: { type: NumericAxis, vertical: true, snapToTicks: 1 }
                     }}>
                        <Gridlines/>
                        <ScatterGraph data={{ bind: "$page.reds" }}
                                    name="Reds"
                                    colorIndex={1}
                                    shape="square"
                                    sizeField="size"
                                    active={{ bind: "$page.showReds" }}
                        />

                        <ScatterGraph data={{ bind: "$page.blues" }}
                                    name="Blues"
                                    colorIndex={5}
                                    sizeField="size"
                                    active={{ bind: "$page.showBlues" }}
                        />

                     </Chart>
                  </Svg>
                  <Legend vertical />
              </div>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <div class="widgets" controller={PageController}>
                  <Svg style="width:500px; height:400px;">
                     <Chart offset="20 -20 -40 130" axes={{
                        x: { type: NumericAxis, snapToTicks: 1 },
                        y: { type: NumericAxis, vertical: true, snapToTicks: 1 }
                     }}>
                        <Gridlines/>
                        <Repeater records={{ bind: "$page.reds" }} recordName="$point">
                           <Marker colorIndex={{ bind: "$point.color" }}
                                 legendColorIndex={1}
                                 active={{ bind: "$page.showReds" }}
                                 name="Reds"
                                 size={{ bind: "$point.size" }}
                                 x={{ bind: "$point.x" }}
                                 y={{ bind: "$point.y" }}
                                 tooltip={{ tpl: "Red ({$point.x:n;0}, {$point.y:n;0})" }}
                                 style={{fillOpacity: 0.5}}
                                 draggableX draggableY
                           />
                        </Repeater>
                        <Repeater records={{ bind: "$page.blues" }} recordName="$point">
                           <Marker colorIndex={{ bind: "$point.color" }}
                                 legendColorIndex={5}
                                 active={{ bind: "$page.showBlues" }}
                                 name="Blues"
                                 size={{ bind: "$point.size" }}
                                 x={{ bind: "$point.x" }}
                                  y={{ bind: "$point.y" }}
                                 tooltip={{ tpl: "Blue ({$point.x:n;0}, {$point.y:n;0})" }}
                                 style={{fillOpacity: 0.5}}
                                 draggableX draggableY/>
                        </Repeater>
                     </Chart>
                  </Svg>
                  <Legend vertical />
              </div>
           </Section>
        </FlexRow>
    </div>
</cx>);









