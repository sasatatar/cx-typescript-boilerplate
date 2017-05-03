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
    Slider,
    CxCredit,
    Grid
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller, KeySelection, Repeater} from "cx/ui";
import {Chart, Gridlines, NumericAxis, PieChart, PieSlice, Legend, ColorMap, LineGraph, ScatterGraph, Marker, Range, CategoryAxis, ColumnGraph, TimeAxis, Column} from 'cx/charts';
import {Rectangle, Svg, Line, ClipRect, Text} from "cx/svg";

var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class PageController extends Controller {
   
   init() {
      super.init();

      // Normalized
      var v1 = 500;
      var v2 = 500;
      var v3 = 500;
      this.store.set('$normalized.points', Array.from({length: 10}, (_, i) => ({
         x: 2000 + i,
         v1: v1 = v1 + (Math.random() - 0.5) * 100,
         v2: v2 = v2 + (Math.random() - 0.5) * 100,
         v3: v3 = v3 + (Math.random() - 0.5) * 100,
      })));

      //Column Chart
      var v1 = 100;

      this.store.set('$page.points', Array.from({length: categories.length}, (_, i) => ({
         x: categories[i],
         v1: v1 = (v1 + (Math.random() - 0.5) * 30),
         v2: v1 + 50 + Math.random() * 100
      })));

      //Timeline
        this.store.init('$page.range', {
            from: new Date(2011, 0, 1),
            to: new Date(2012, 0, 1),
        });

        var v = 2000;

        this.store.init('$page.data', Array.from({length: 10 * 12}, (x, i)=>({
            date: new Date(2005, i, 1),
            value: v = (v + Math.random() * 300 - 150)
        })));

      //Multi-level
      this.store.set('$multilevel.points', Array.from({length: 7}).map((_, i) => {
         var value = 20 + Math.random() * 100;
         return {
            x: i * 5,
            v: value,
            slices: Array.from({length: 5}).map(x=>({sv: value / 5}))
         }
      }));

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
      
      // Stacked Line Chart
      this.store.init('$page.stack', true);
      var y1 = 300, y2 = 200, y3 = 100;
      this.store.set('$stacked.points', Array.from({length: 101}, (_, i) => ({
         x: i * 4,
         y1: y1 = (y1 + (Math.random() - 0.5) * 30),
         y2: y2 = (y2 + (Math.random() - 0.5) * 30),
         y3: y3 = (y3 + (Math.random() - 0.5) * 30)
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

var columnSelection = new KeySelection({
   keyField: 'x',
   bind: '$page.selection',
   record: { bind: '$point' },
   index: { bind: '$index' }
});

register('Charts', 'Other examples', <cx>
    <h2 putInto="header">Charts</h2>
    <div class="example pad wrap">
        <FlexRow wrap spacing="large">
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <Legend.Scope>
              <Svg style="width:600px; height:400px;">
                  <Chart offset="20 -20 -40 40" axes={{
                        x: CategoryAxis,
                        y: { type: NumericAxis, vertical: true, normalized: true, format: 'p' }
                     }}>
                     <Gridlines/>
                     <Repeater records={{ bind: "$normalized.points" }} recordName="$point">
                        <Column name="V1"
                              active={{ bind: "$page.v1" }}
                              colorIndex={0}
                              x={{ bind: "$point.x" }}
                              y={{ bind: "$point.v1" }}
                              tooltip={{ tpl: "V1 {$point.x} {$point.v1:n}" }}
                              stacked />

                        <Column name="V2"
                              active={{ bind: "$page.v2" }}
                              colorIndex={2}
                              x={{ bind: "$point.x" }}
                              y={{ bind: "$point.v2" }}
                              tooltip={{ tpl: "V2 {$point.x} {$point.v2:n}" }}
                              stacked />

                        <Column name="V3"
                              active={{ bind: "$page.v3" }}
                              colorIndex={4}
                              x={{ bind: "$point.x" }}
                              y={{ bind: "$point.v3" }}
                              tooltip={{ tpl: "V3 {$point.x} {$point.v3:n}" }}
                              stacked />

                     </Repeater>
                  </Chart>          
               </Svg>
               <Legend />
               </Legend.Scope>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <Svg style="width:600px; height:400px;">
                  <Chart offset="20 -20 -40 40" axes={{ x: { type: CategoryAxis }, y: { type: NumericAxis, vertical: true, snapToTicks: 0 } }}>
                     <Gridlines/>
                     <Repeater records={{ bind: "$page.points" }} recordName="$point">
                        <Column colorIndex={{ expr: "{$index}" }}
                              width={0.5}
                              offset={0}
                              x={{ bind: "$point.x" }}
                              y={{ bind: "$point.v1" }}
                              tooltip={{ tpl: "{$point.x} {$point.v1:n}" }}
                              selection={columnSelection} />

                        <Column colorIndex={{ expr: "{$index}+2" }}
                              width={0.5}
                              offset={0}
                              x={{ bind: "$point.x" }}
                              y0={{ bind: "$point.v1" }}
                              y={{ bind: "$point.v2" }}
                              tooltip="X2"
                              selection={columnSelection} />

                        <Marker x={{ bind: "$point.x" }}
                              y={{ bind: "$point.v1" }}
                              xOffset={0}
                              size={10}
                              colorIndex={{ expr: "{$index}" }}
                              style="cursor:move;"
                              draggableY>
                           <Rectangle anchors="0 1 0 0"
                                    offset="-30 10 -10 -10"
                                    style="fill:rgba(255, 255, 255, 0.8);stroke:#ccc">
                              <Text tpl="{$point.v1:n;0}" ta="middle" dy="0.4em" />
                           </Rectangle>
                        </Marker>
                        <Marker x={{ bind: "$point.x" }}
                              y={{ bind: "$point.v2" }}
                              xOffset={0}
                              size={10}
                              colorIndex={{ expr: "{$index}+2" }}
                              style="cursor:move;"
                              draggableY >
                           <Rectangle anchors="0 1 0 0"
                                    offset="-30 10 -10 -10"
                                    style="fill:rgba(255, 255, 255, 0.8);stroke:#ccc">
                              <Text tpl="{$point.v2:n;0}" ta="middle" dy="0.4em" />
                           </Rectangle>
                        </Marker>
                     </Repeater>
                  </Chart>
               </Svg>
               <Grid records={{ bind: "$page.points" }}
                     columns={[
                        { header: 'Month', field: 'x' },
                        { header: 'V1', field: 'v1', format: 'n', align: "right" },
                        { header: 'V2', field: 'v2', format: 'n', align: "right" },
                        { header: 'Delta', value: { expr: "{$record.v2}-{$record.v1}" }, format: 'n', align: "right" },
                     ]}
                     selection={{type: KeySelection, keyField: 'x', bind: '$page.selection' }}/>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div controller={PageController}>
                  <Svg style="width:100%;height:600px;" margin="60 10 60 60">
                     <Chart
                           anchors="0 1 0.8 0"
                           offset="0 0 -50 0"
                           axes={{
                              x: <TimeAxis min={{ bind: "$page.range.from" }} max={{ bind: "$page.range.to" }} snapToTicks={false}/>,
                              y: <NumericAxis vertical/>,
                           }}>
                           <Rectangle fill="white"/>
                           <Gridlines />
                           <ClipRect>
                              <ColumnGraph data={{ bind: "$page.data" }}
                                          colorIndex={4}
                                          offset={15 * 24 * 60 * 60 * 1000} //15 days
                                          size={30 * 24 * 60 * 60 * 1000} //30 days
                                          xField="date"
                                          yField="value"/>
                           </ClipRect>
                     </Chart>

                     <Chart
                           anchors="0.8 1 1 0"
                           axes={{
                              x: <TimeAxis />,
                              y: <NumericAxis vertical/>,
                           }}>
                           <Rectangle fill="white"/>
                           <Gridlines />
                           <ColumnGraph
                              data={{ bind: "$page.data" }}
                              size={30 * 24 * 60 * 60 * 1000}
                              offset={15 * 24 * 60 * 60 * 1000}
                              xField="date"
                              yField="value"
                           />

                           <Range x1={{ bind: "$page.range.from" }}
                                 x2={{ bind: "$page.range.to" }}
                                 hidden>
                              <ClipRect>
                                 <ColumnGraph
                                       data={{ bind: "$page.data" }}
                                       colorIndex={4}
                                       size={30 * 24 * 60 * 60 * 1000}
                                       offset={15 * 24 * 60 * 60 * 1000}
                                       xField="date"
                                       yField="value"
                                 />
                              </ClipRect>
                              <Range colorIndex={4}
                                    x1={{ bind: "$page.range.from" }}
                                    x2={{ bind: "$page.range.to" }}
                                    style="cursor:move"
                                    draggableX
                                    constrainX/>
                           </Range>

                           <Marker
                              colorIndex={4}
                              x={{ bind: "$page.range.from" }}
                              size={10}
                              draggableX
                              constrain
                           />

                           <Marker
                              colorIndex={4}
                              x={{ bind: "$page.range.to" }}
                              size={10}
                              draggableX
                              constrain
                           />

                     </Chart>
                  </Svg>
               </div>
           </Section>
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

           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
              <div class="widgets" controller={PageController}>
                 <Legend.Scope>
                  <Svg style="width:600px; height:400px;">
                     <Chart offset="20 -10 -40 40" axes={{ x: { type: NumericAxis }, y: { type: NumericAxis, vertical: true } }}>
                        <Gridlines/>
                        <LineGraph name="Line 1" data={{ bind: "$stacked.points" }} colorIndex={0} area={{ bind: "$page.stack" }} yField="y1" active={{ bind: "$page.line1" }} stacked={{ bind: "$page.stack" }}/>
                        <LineGraph name="Line 2" data={{ bind: "$stacked.points" }} colorIndex={5} area={{ bind: "$page.stack" }} yField="y2" active={{ bind: "$page.line2" }} stacked={{ bind: "$page.stack" }}/>
                        <LineGraph name="Line 3" data={{ bind: "$stacked.points" }} colorIndex={10} area={{ bind: "$page.stack" }} yField="y3" active={{ bind: "$page.line3" }} stacked={{ bind: "$page.stack" }}/>
                     </Chart>
                  </Svg>
                  <Legend />
                  <Checkbox value={{ bind: "$page.stack" }}>Stack</Checkbox>
               </Legend.Scope>
               </div>
           </Section>
                      <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
               <div class="widgets" controller={PageController}>
                  <Legend.Scope>
                     <Legend />
                        <Svg style="width:400px; height:400px;">
                           <PieChart angle={360}>
                              <Repeater records={{ bind: "$multilevel.points" }}>
                                 <PieSlice value={{ bind: '$record.v' }}
                                          active={{ bind: '$record.active' }}
                                             colorIndex={{ expr: '{$index} * 3 % 16' }}
                                             r={{ expr: '55' }}
                                             r0={{ expr: '20' }}
                                             offset={3}
                                             name={{ tpl: "Item {$index}" }}
                                             selection={{
                                                type: KeySelection,
                                                bind:'$page.selection',
                                                records: {bind:'$multilevel.points'},
                                                record: {bind:'$record'},
                                                index: {bind:'$index'},
                                                keyField: 'x'
                                             }}>
                                 </PieSlice>
                                 <Repeater records={{ bind: "$record.slices" }} recordName="$slice" indexName="$sliceIndex">
                                    <PieSlice value={{ bind: '$slice.sv' }}
                                             active={{ bind: '$record.active' }}
                                             colorIndex={{ expr: '{$index} * 3 % 16' }}
                                             r={{ expr: '90' }}
                                             r0={{ expr: '58' }}
                                             offset={3}
                                             name={{ tpl: "Slice {$sliceIndex}" }}
                                             legend={{ expr: "{$page.selection} == {$record.x} ? 'slice' : false" }}
                                             stack="outer"
                                             style={{
                                                fillOpacity: {expr: '0.3 + 0.7 * ({$sliceIndex} / 4)'}
                                             }}
                                             selection={{
                                                   type: KeySelection,
                                                   bind:'$page.selection',
                                                   records: {bind:'$multilevel.points'},
                                                   record: {bind:'$record'},
                                                   index: {bind:'$index'},
                                                   keyField: 'x'
                                                }}>
                                    </PieSlice>
                                 </Repeater>
                              </Repeater>
                           </PieChart>
                        </Svg>
                     <Legend name="slice" vertical />
                  </Legend.Scope>
               </div>
           </Section>
        </FlexRow>
        <CxCredit />
    </div>
</cx>);









