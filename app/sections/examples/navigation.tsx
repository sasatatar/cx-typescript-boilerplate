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
    Menu,
    Submenu,
    MenuItem,
    Tab,
    Link,
    LinkButton

} from "cx/widgets";
import {computable, updateArray} from "cx/data";
import {LabelsLeftLayout, LabelsTopLayout, Controller} from "cx/ui";


class PageController extends Controller {
    init() {
      super.init();
      this.store.set('$page.tab', 'tab1');
 }   
}

register('Navigation', 'Other examples', <cx>
    <h2 putInto="header">Navigation</h2>
    <div class="example pad wrap">
        <FlexRow wrap spacing="large">
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <Menu horizontal>
                    <Submenu>
                    File
                    <Menu putInto="dropdown">
                        <a href="#" onClick={e=>{ e.preventDefault(); document.activeElement.blur(); }}>Link</a>
                        <hr/>
                        <TextField value={{ bind: "$page.text" }} mod="menu" />
                        <TextField value={{ bind: "$page.text" }} mod="menu" />
                        <Checkbox value={{ bind: "$page.checked" }} mod="menu">Checkbox</Checkbox>
                        <Submenu arrow>
                            Submenu 1
                            <Menu putInto="dropdown">
                                <a href="#" class="cxm-menu">Item 1</a>
                                <a href="#" class="cxm-menu">Item 2</a>
                            </Menu>
                        </Submenu>
                        <Submenu arrow>
                            Submenu 2
                            <Menu putInto="dropdown">
                                <a href="#">Item 1</a>
                                <a href="#">Item 2</a>
                            </Menu>
                        </Submenu>
                        <DateField value={{ bind: "$page.date" }} mod="menu" />
                        <MenuItem mod="active" class="test" style="color:red;" autoClose>
                            <a href="#">Item Level CSS</a>
                        </MenuItem>
                    </Menu>
                    </Submenu>
                    <Submenu>
                    Edit
                    <Menu putInto="dropdown">
                        <a href="#">Link</a>
                        <hr/>
                        <TextField value={{ bind: "$page.text" }} mod="menu"/>
                        <Checkbox value={{ bind: "$page.checked" }} mod="menu">Checkbox</Checkbox>
                        <Submenu>
                            Submenu 1
                            <Menu putInto="dropdown">
                                <a href="#"class="cxm-menu-pad">Item 1</a>
                                <a href="#"class="cxm-menu-pad">Item 2</a>
                            </Menu>
                        </Submenu>
                        <Submenu>
                            Submenu 2
                            <Menu putInto="dropdown">
                                <a href="#" class="cxm-menu-pad">Item 1</a>
                                <a href="#" class="cxm-menu-pad">Item 2</a>
                            </Menu>
                        </Submenu>
                    </Menu>
                    </Submenu>
                </Menu>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div style="margin:10px">
                    <Tab tab="tab1" value={{ bind: "$page.tab" }}>Tab 1</Tab>
                    <Tab tab="tab2" value={{ bind: "$page.tab" }}>Tab 2</Tab>
                    <Tab tab="tab3" value={{ bind: "$page.tab" }}>Tab 3</Tab>
                    <Tab tab="tab4" value={{ bind: "$page.tab" }} disabled>Tab 4</Tab>
                    </div>
                    <div style="margin:10px">
                    <Tab tab="tab1" value={{ bind: "$page.tab" }} mod="line">Tab 1</Tab>
                    <Tab tab="tab2" value={{ bind: "$page.tab" }} mod="line">Tab 2</Tab>
                    <Tab tab="tab3" value={{ bind: "$page.tab" }} mod="line">Tab 3</Tab>
                    <Tab tab="tab4" value={{ bind: "$page.tab" }} mod="line" disabled>Tab 4</Tab>
                    </div>
                    <div style="margin:10px">
                    <div style="padding-left:10px;white-space:nowrap;">
                        <Tab tab="tab1" value={{ bind: "$page.tab" }} mod="classic">Tab 1</Tab>
                        <Tab tab="tab2" value={{ bind: "$page.tab" }} mod="classic">Tab 2</Tab>
                        <Tab tab="tab3" value={{ bind: "$page.tab" }} mod="classic">Tab 3</Tab>
                        <Tab tab="tab4" value={{ bind: "$page.tab" }} mod="classic" disabled>Tab 4</Tab>
                    </div>
                    <div style="border: 1px solid lightgray; background: white; padding: 20px">
                        <div visible={{ expr: "{$page.tab}=='tab1'" }}>Tab 1</div>
                        <div visible={{ expr: "{$page.tab}=='tab2'" }}>Tab 2</div>
                        <div visible={{ expr: "{$page.tab}=='tab3'" }}>Tab 3</div>
                        <div visible={{ expr: "{$page.tab}=='tab4'" }}>Tab 4</div>
                    </div>
                </div>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div class="widgets">
                    <Link href="~/widgets/link-buttons">Link Buttons</Link>
                </div>
            </Section>
            <Section mod="well" layout={{type: LabelsTopLayout, vertical: true}}>
                <div class="widgets">
                    <LinkButton mod="primary" href="~/widgets/links">See Links</LinkButton>
                    <LinkButton mod="danger" href="~/widgets/buttons">See Buttons</LinkButton>
                </div>
            </Section>
        </FlexRow>
    </div>
</cx>);









