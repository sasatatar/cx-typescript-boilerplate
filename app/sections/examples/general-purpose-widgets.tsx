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
    ValidationGroup,
    Heading,
    Icon
} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller} from "cx/ui";

register('General Purpose Widgets', 'Other examples', <cx>
    <h2 putInto="header">General Purpose Widgets</h2>
    <div class="example pad wrap">
        <FlexRow wrap spacing="large">
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
               <div style="width:200px" class="test">
                    <h4>H4</h4>
                    <p>Paragraph</p>
                    <span>Span</span>
                    <hr />
                    <br />
                    <input type="text" />
                </div>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
               <ValidationGroup layout={LabelsLeftLayout} invalid={{ bind: "$page.invalid" }}>
                    <TextField label="Text" value={{ bind: "$page.text" }} required />
                    <NumberField label="Number" value={{ bind: "$page.number" }} required minValue={10} />
                    <Text value="Please correct the errors." visible= {{ bind: "$page.invalid" }}/>
                </ValidationGroup>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
               <Button onClick={() => { MsgBox.alert('Regular')}}>Regular</Button>
               <Button pressed>Pressed</Button>
               <Button disabled onClick={() => { MsgBox.alert('Disabled') }}>Disabled</Button>
               <Button mod="primary" onClick={() => { MsgBox.alert('Primary') }}>Primary</Button>
               <Button mod="danger" confirm="You clicked the danger button. Are you sure that you want to proceed?"
                   onClick={() => {
                       MsgBox.alert('Danger')
                   }}>
                   Danger
               </Button>
               <Button mod="hollow" icon="pencil">Icon + Text</Button>
               <Button mod="hollow" icon="refresh" />
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
               <Section mod="card" title="Section 1">
                   Aenean quis ullamcorper dolor. Phasellus ullamcorper sapien elit, ac pharetra nibh mollis sed.
               </Section>   
               <Section title="Section 2">
                   Aenean quis ullamcorper dolor. Phasellus ullamcorper sapien elit, ac pharetra nibh mollis sed.   
                   <FlexRow putInto="footer">
                       <Button mod="hollow" icon="calendar"/>
                       <Button mod="hollow" icon="calculator"/>
                       <Button mod="hollow" icon="search"/>
                   </FlexRow>
               </Section>   
               <Section mod="card">
                   <FlexRow align="center" putInto="header">
                       <Heading level="4" style="color:lightblue">Custom Header</Heading>
                       <Button mod="hollow" icon="close" style="margin-left: auto"/>
                   </FlexRow>
                   Aenean quis ullamcorper dolor. Phasellus ullamcorper sapien elit, ac pharetra nibh mollis sed.
               </Section>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
               <div>
                    <Heading level="1">Heading 1</Heading>
                    <Heading level="2">Heading 2</Heading>
                    <Heading level="3">Heading 3</Heading>
                    <Heading level="4">Heading 4</Heading>
                    <Heading level="5">Heading 5</Heading>
                    <Heading level="6">Heading 6</Heading>
                </div>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
               <FlexRow spacing>
                   <div style="width: 30px; height: 30px; background: lightgray;" />
                   <div style="width: 40px; height: 40px; background: lightgray;" />
                   <div style="width: 50px; height: 50px; background: lightgray;" />
               </FlexRow>
               <FlexRow spacing justify="center">
                   <div style="width: 30px; height: 30px; background: lightgray;" />
                   <div style="width: 40px; height: 40px; background: lightgray;" />
                   <div style="width: 50px; height: 50px; background: lightgray;" />
               </FlexRow>
               <FlexRow spacing align="center" justify="end">
                   <div style="width: 30px; height: 30px; background: lightgray;" />
                   <div style="width: 40px; height: 40px; background: lightgray;" />
                   <div style="width: 50px; height: 50px; background: lightgray;" />
               </FlexRow>
               <FlexRow spacing wrap>
                   <Repeater records={Array.from({length: 20})}>
                       <div style="width: 30px; height: 30px; background: lightgray;" />
                   </Repeater>
               </FlexRow>
               <FlexRow pad spacing wrap style="background:#eee;border:1px solid lightgray;">
                   <Repeater records={Array.from({length: 20})}>
                       <div style="width: 30px; height: 30px; background: lightgray;" />
                   </Repeater>
               </FlexRow>             
               <FlexRow pad hspacing="xsmall" vspacing="xlarge" wrap style="background:#eee;border:1px solid lightgray;">
                   <Repeater records={Array.from({length: 40})}>
                       <div style="width: 30px; height: 30px; background: lightgray;" />
                   </Repeater>
               </FlexRow>
               <FlexRow spacing target="desktop">
                   <div style="flex: 1; height: 30px; background: lightgray;" />
                   <div style="flex: 1; height: 30px; background: lightgray;" />
                   <div style="flex: 1; height: 30px; background: lightgray;" />
               </FlexRow>
               <FlexRow spacing target="tablet">
                   <div style="flex: 1; height: 30px; background: lightgray;" />
                   <div style="flex: 1; height: 30px; background: lightgray;" />
               </FlexRow>
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Icon name="calendar" />
                <Icon name="calculator" style="color:blue" />
                <Icon name="bug" style="background:yellow"/>
                <Icon name="pencil" />
           </Section>
           <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
               <ValidationGroup layout={LabelsLeftLayout} invalid={{ bind: "$page.invalid" }}>
                    <TextField label="Text" value={{ bind: "$page.text" }} required />
                    <NumberField label="Number" value={{ bind: "$page.number" }} required minValue={10} />
                    <Text value="Please correct the errors." visible={{ bind: "$page.invalid" }}/>
                </ValidationGroup>
           </Section>
        </FlexRow>
    </div>
</cx>);









