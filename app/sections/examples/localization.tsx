import {register} from '../registry';
import { Culture } from 'cx/ui';
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

declare var System: any;

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
    }
}

register('Localization', 'Other examples', <cx>
    <h2 putInto="header">Localization</h2>
    <div class="example pad wrap">
        <h3>Localization</h3>
        <FlexRow wrap spacing="large">
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
        </FlexRow>
    </div>
</cx>);









