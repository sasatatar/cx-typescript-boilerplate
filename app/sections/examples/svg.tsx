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
    Slider
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller} from "cx/ui";
import {Svg, Rectangle, Ellipse, Line, ClipRect, Text} from "cx/svg";

register('Svg', 'Other examples', <cx>
    <h2 putInto="header">Svg</h2>
    <div class="example pad wrap">
        <FlexRow wrap spacing="large">
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0 1 1 0" style="fill:lightblue" />
                    <Text textAnchor="middle" dy="0.4em" style="font-size:10px">0 1 1 0</Text>
                </Svg>

                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0.25 0.75 0.75 0.25" style="fill:lightblue" />
                    <Text textAnchor="middle" dy="0.4em" style="font-size:10px">0.25 0.75 0.75 0.25</Text>
                </Svg>

                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0 0.5 1 0" style="fill:lightblue" />
                    <Text textAnchor="middle" dy="0.4em" style="font-size:10px">0 0.5 1 0</Text>
                </Svg>

                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0 1 0.5 0" style="fill:lightblue" />
                    <Text textAnchor="middle" dy="0.4em" style="font-size:10px">0 1 0.5 0</Text>
                </Svg>

                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0.5 1 1 0.5" style="fill:lightblue" />
                    <Text textAnchor="middle" dy="0.4em" style="font-size:10px">0.5 1 1 0.5</Text>
                </Svg>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0 1 1 0" offset="5 -5 -5 5" style="fill:lightblue" />
                    <Text textAnchor="middle" dy="-0.1em" style="font-size:10px">A: 0 1 1 0</Text>
                    <Text textAnchor="middle" dy="0.9em" style="font-size:10px">O: 5 -5 -5 5</Text>
                </Svg>

                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0.5 0.5 0.5 0.5" offset="-30 30 30 -30" style="fill:lightblue" />
                    <Text textAnchor="middle" dy="-0.1em" style="font-size:10px">A: 0.5 0.5 0.5 0.5</Text>
                    <Text textAnchor="middle" dy="0.9em" style="font-size:10px">O: -30 30 30 -30</Text>
                </Svg>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0 1 1 0" margin={5} style="fill:lightblue" />
                    <Text textAnchor="middle" dy="-0.1em" style="font-size:10px">A: 0 1 1 0</Text>
                    <Text textAnchor="middle" dy="0.9em" style="font-size:10px">M: 5</Text>
                </Svg>

                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0.5 0.5 0.5 0.5" margin={-30} style="fill:lightblue" />
                    <Text textAnchor="middle" dy="-0.1em" style="font-size:10px">A: 0.5 0.5 0.5 0.5</Text>
                    <Text textAnchor="middle" dy="0.9em" style="font-size:10px">M: -30</Text>
                </Svg>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Svg style="width:100%" aspectRatio={4} autoHeight>
                    <Rectangle anchors="0 1 1 0" style="fill:lightblue"/>
                </Svg>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0 1 1 0" style="fill:lightblue" />
                    <Text anchors="0 1 1 0" textAnchor="start" dy="0.8em">Top-left</Text>
                </Svg>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0 1 1 0.5" style="fill:lightblue" />
                    <Text anchors="0 1 1 0.5" textAnchor="middle" dy="0.8em">Top-center</Text>
                </Svg>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0 1 1 1" style="fill:lightblue" />
                    <Text anchors="0 1 1 1" textAnchor="end" dy="0.8em">Top-right</Text>
                </Svg>

                    <div style="width:100%" />

                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0.5 1 1 0" style="fill:lightblue" />
                    <Text anchors="0.5 1 1 0" textAnchor="start" dy="0.4em">Middle-left</Text>
                </Svg>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0.5 1 1 0.5" style="fill:lightblue" />
                    <Text anchors="0.5 1 1 0.5" textAnchor="middle" dy="0.4em">Middle-center</Text>
                </Svg>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="0.5 1 1 1" style="fill:lightblue" />
                    <Text anchors="0.5 1 1 1" textAnchor="end" dy="0.4em">Middle-right</Text>
                </Svg>

                    <div style="width:100%" />

                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="1 1 1 0" style="fill:lightblue" />
                    <Text anchors="1 1 1 0" textAnchor="start">Bottom-left</Text>
                </Svg>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="1 1 1 0.5" style="fill:lightblue" />
                    <Text anchors="1 1 1 0.5" textAnchor="middle">Bottom-center</Text>
                </Svg>
                <Svg style="width:100px;height:100px;background:white;margin:5px">
                    <Rectangle anchors="1 1 1 1" style="fill:lightblue" />
                    <Text anchors="1 1 1 1" textAnchor="end">Bottom-right</Text>
                </Svg>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}> 
                <Svg style="width:400px;height:400px;background:white" padding={5}>
                    <Rectangle anchors="0 .25 .25 0" margin={5} colorIndex={0} />
                    <Rectangle anchors="0 .5 .25 .25" margin={5} colorIndex={1} />
                    <Rectangle anchors="0 .75 .25 .5" margin={5} colorIndex={2} />
                    <Rectangle anchors="0 1 .25 .75" margin={5} colorIndex={3} />

                    <Rectangle anchors=".25 .25 .5 0" margin={5} colorIndex={7} />
                    <Rectangle anchors=".25 .5 .5 .25" margin={5} colorIndex={6} />
                    <Rectangle anchors=".25 .75 .5 .5" margin={5} colorIndex={5} />
                    <Rectangle anchors=".25 1 .5 .75" margin={5} colorIndex={4} />

                    <Rectangle anchors=".5 .25 .75 0" margin={5} colorIndex={8} />
                    <Rectangle anchors=".5 .5 .75 .25" margin={5} colorIndex={9} />
                    <Rectangle anchors=".5 .75 .75 .5" margin={5} colorIndex={10} />
                    <Rectangle anchors=".5 1 .75 .75" margin={5} colorIndex={11} />

                    <Rectangle anchors=".75 .25 1 0" margin={5} colorIndex={15} />
                    <Rectangle anchors=".75 .5 1 .25" margin={5} colorIndex={14} />
                    <Rectangle anchors=".75 .75 1 .5" margin={5} colorIndex={13} />
                    <Rectangle anchors=".75 1 1 .75" margin={5} colorIndex={12} />
                </Svg>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}> 
                <Svg style="width:400px;height:400px;background:white" padding={5}>
                    <Ellipse margin={10} colorIndex={0} />
                    <Ellipse margin={20} colorIndex={1} />
                    <Ellipse margin={30} colorIndex={2} />
                    <Ellipse margin={40} colorIndex={3} />
                    <Ellipse margin={50} colorIndex={4} />
                    <Ellipse margin={60} colorIndex={5} />
                    <Ellipse margin={70} colorIndex={6} />
                    <Ellipse margin={80} colorIndex={7} />
                    <Ellipse margin={90} colorIndex={8} />
                    <Ellipse margin={100} colorIndex={9} />
                    <Ellipse margin={110} colorIndex={10} />
                    <Ellipse margin={120} colorIndex={11} />
                    <Ellipse margin={130} colorIndex={12} />
                    <Ellipse margin={140} colorIndex={13} />
                    <Ellipse margin={150} colorIndex={14} />
                    <Ellipse margin={160} colorIndex={15} />
                </Svg>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Svg style="width:200px;height:200px;background:white" padding={5}>
                    <Line stroke="blue">
                        <Text dx="5px">Line</Text>
                    </Line>
                </Svg>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div class="widgets">
                    <Svg style="width:200px;height:200px;background:white;margin:5px">
                        <ClipRect margin={15}>
                            <Ellipse margin={-10} fill="red" />
                        </ClipRect>
                    </Svg>
                </div>
            </Section>

        </FlexRow>
    </div>
</cx>);









