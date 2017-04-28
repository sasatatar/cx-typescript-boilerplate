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
    Slider,
    CxCredit
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller, KeySelection, Repeater} from "cx/ui";
import {Chart, Gridlines, NumericAxis, PieChart, PieSlice, Legend, ColorMap, LineGraph, ScatterGraph, Marker, Range, CategoryAxis, ColumnGraph, TimeAxis} from 'cx/charts';
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

      // Range
      var y = 100;
      this.store.set('$range.points', Array.from({length: 101}, (_, i) => ({
         x: i * 4,
         y: y = y + (Math.random() - 0.4) * 30
      })));

      this.store.set('$page.p1', { x: 150, y: 250 });
      this.store.set('$page.p2', { x: 250, y: 350 });

      // TimeAxis
      this.store.set('$page.data', Array.from({length: 5 * 12}, (x, i)=>({
            date: new Date(2010, i, 1),
            value: Math.random() * 1000
        })));

      // ColorMap
      this.store.set('$page.series', Array.from({length: 5}, (_, i) => {
      var y = 100 + Math.random() * 200;
      return {
          name: 'Series ' + (i + 1),
          active: true,
          points: Array.from({length: 26}, (_, x)=>({
              x: x * 4,
              y: (y = y + Math.random() * 100 - 50)
           }))
          }
      }));
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
                 <Legend.Scope>
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
                  </Legend.Scope>
              </div>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <div class="widgets" controller={PageController}>
                 <Legend.Scope>
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
                  </Legend.Scope>
              </div>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <div class="widgets" controller={PageController}>
                 <Legend.Scope>
                     <Svg style="width:600px; height:400px;">
                        <Chart offset="20 -10 -40 40" axes={{ x: { type: NumericAxis }, y: { type: NumericAxis, vertical: true } }}>
                           <Gridlines/>
                           <Range x1={{ bind: "$page.p1.x" }} x2={{ bind: "$page.p2.x" }} colorIndex={11} name="X Range" active={{ bind: "$page.yrange" }}>
                              <Text anchors="0 0.5 0 0.5" offset="5 0 0 0" ta="middle" dy="0.8em">X Range</Text>
                           </Range>
                           <Range y1={{ bind: "$page.p1.y" }} y2={{ bind: "$page.p2.y" }} colorIndex={8} name="Y Range" active={{ bind: "$page.xrange" }}>
                              <Text anchors="0.5 0 0.5 0" dy="0.4em" dx={5}>Y Range</Text>
                           </Range>
                           <LineGraph data={{ bind: "$range.points" }} colorIndex={0}  />
                           <Marker colorIndex={11} x={{ bind: "$page.p1.x" }} size={10} draggableX  />
                           <Marker colorIndex={11} x={{ bind: "$page.p2.x" }} size={10} draggableX  />
                           <Marker colorIndex={8} y={{ bind: "$page.p1.y" }} size={10} draggableY />
                           <Marker colorIndex={8} y={{ bind: "$page.p2.y" }} size={10} draggableY />
                        </Chart>
                     </Svg>
                     <Legend />
                  </Legend.Scope>
              </div>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <Svg style="width:400px;height:300px;" margin="60 60 60 60">
                 <Chart axes={{
                    x: <NumericAxis min={100} max={500} />,
                    y: <NumericAxis vertical max={5000} />,
                    x2: <NumericAxis secondary inverted />,
                    y2: <NumericAxis vertical secondary />
                 }}>
                    <Rectangle fill="white" margin={1}/>
                    <Gridlines />
                    <Gridlines xAxis="x2" yAxis="y2" />
                 </Chart>
              </Svg>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <Svg style="width:400px;height:300px;" margin="60 60 60 60">
                 <Chart axes={{
                    x: <CategoryAxis />,
                    y: <CategoryAxis vertical />
                 }}>
                    <Rectangle fill="white"/>
                    <Gridlines />  
                    <Marker x="Red" y="Triangle" shape="triangle" size={20} colorIndex="0" />
                    <Marker x="Green" y="Triangle" shape="triangle" size={20} colorIndex="9" />
                    <Marker x="Blue" y="Triangle" shape="triangle" size={20} colorIndex="5" />  
                    <Marker x="Red" y="Square" shape="square" size={20} colorIndex="0" />
                    <Marker x="Green" y="Square" shape="square" size={20} colorIndex="9" />
                    <Marker x="Blue" y="Square" shape="square" size={20} colorIndex="5" />  
                    <Marker x="Red" y="Circle" shape="circle" size={20} colorIndex="0" />
                    <Marker x="Green" y="Circle" shape="circle" size={20} colorIndex="9" />
                    <Marker x="Blue" y="Circle" shape="circle" size={20} colorIndex="5" />  
                 </Chart>
              </Svg>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <div class="widgets" controller={PageController}>
                 <Svg style="width:600px;height:300px;" margin="60 60 60 60">
                    <Chart axes={{
                          x: <TimeAxis />,
                          y: <NumericAxis vertical />,
                    }}>
                          <Rectangle fill="white"/>
                          <Gridlines />
                          <ColumnGraph data={{ bind: "$page.data" }}
                                      size={30 * 24 * 60 * 60 * 1000}
                                      offset={15 * 24 * 60 * 60 * 1000}
                                      xField="date"
                                      yField="value" />
                    </Chart>
                 </Svg>
              </div>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <div class="widgets" controller={PageController}>
                 <Legend.Scope>
                     <Svg style="width:600px; height:400px;">
                        <Chart offset="20 -10 -40 40"
                                 axes={{
                                    x: {type: NumericAxis},
                                    y: {type: NumericAxis, vertical: true}
                                 }}>
                              <Gridlines/>
                              <ColorMap />
                              <Repeater records={{ bind: "$page.series" }}>
                                 <LineGraph name={{ bind: "$record.name" }}
                                             active={{ bind: "$record.active" }}
                                             data={{ bind: "$record.points" }}
                                             colorMap="lines" />
                              </Repeater>
                        </Chart>
                     </Svg>
                     <Legend />
                  </Legend.Scope>
              </div>
           </Section>
        </FlexRow>
        <CxCredit />
    </div>
</cx>);









