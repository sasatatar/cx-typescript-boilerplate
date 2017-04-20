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
    Button
} from "cx/widgets";

import {LabelsLeftLayout, LabelsTopLayout, Controller} from "cx/ui";

class PageController extends Controller {
  onInit() {
    this.store.init("$page", { count: 0 });
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
                    value={{ bind:"$page.count"}}
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









