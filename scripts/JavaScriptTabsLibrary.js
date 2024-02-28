var showDebugDialogMessages = true;

function disableDeduggingDialogs() {
	showDebugDialogMessages = false;
}

function enableDebuggingDialogs() {
	showDebugDialogMessages = true;
}

var isAnvilleStyleAdded = false;
var containerElementIDs = {length: 0};

function appendStyleAndPopupViews() {
	let tabStyleString = ".anvillehiddenScrollBarElements {";
	tabStyleString += "scrollbar-face-color: ThreeDFace !important;";
	tabStyleString += "scrollbar-shadow-color: ThreeDDarkShadow !important;";
	tabStyleString += "scrollbar-highlight-color: ThreeDHighlight !important;";
	tabStyleString += "scrollbar-3dlight-color: ThreeDLightShadow !important;";
	tabStyleString += "scrollbar-darkshadow-color: ThreeDDarkShadow !important;";
	tabStyleString += "scrollbar-track-color: Scrollbar !important;";
	tabStyleString += "scrollbar-arrow-color: ButtonText !important;";
	tabStyleString += "-ms-overflow-style: none;";
	tabStyleString += "scrollbar-width: none;";
	tabStyleString += "}";

	tabStyleString += ".anvillehiddenScrollBarElements::-webkit-scrollbar {";
	tabStyleString += "display: none;";
	tabStyleString += "}";

	tabStyleString += ".anvilletabButtonsContainer {";
	tabStyleString += "display: table;";
	tabStyleString += "white-space: nowrap;";
	tabStyleString += "margin-left: auto;";
	tabStyleString += "margin-right: auto;";
	tabStyleString += "margin-top: 0vh;";
	tabStyleString += "border: solid 1px gold;";
	tabStyleString += "border-radius: 0 0 2vh 2vh;";
	tabStyleString += "}";

	tabStyleString += ".anvilletabButtons {";
	tabStyleString += "display: inline-table;";
	tabStyleString += "padding: 1vh 2vw;";
	tabStyleString += "font-size: 0.7em;";
	tabStyleString += "color: gold;";
	tabStyleString += "border: none;";
	tabStyleString += "user-select: none;";
	tabStyleString += "cursor: pointer;";
	tabStyleString += "border-radius: 0 0 2vh 2vh;";
	tabStyleString += "background: transparent;";
	tabStyleString += "}";

	tabStyleString += ".anvilletabButtons:hover {";
	tabStyleString += "background: #ffd70040;";
	tabStyleString += "}";

	tabStyleString += ".anvilletabButtons:active {";
	tabStyleString += "color: black;";
	tabStyleString += "background: #ffd700;";
	tabStyleString += "}";

	tabStyleString += ".anvilletabButtons:focus {";
	tabStyleString += "outline: none;";
	tabStyleString += "}";

	tabStyleString += ".anvilletabButtonsActive {";
	tabStyleString += "color: white;";
	tabStyleString += "background: #ffd70077;";
	tabStyleString += "}";

	tabStyleString += ".anvilletabsContainer {";
	tabStyleString += "display: flex;";
	tabStyleString += "flex-direction: row;";
	tabStyleString += "overflow-y: hidden;";
	tabStyleString += "overflow-x: scroll;";
	tabStyleString += "width: 50vw;";
	tabStyleString += "height: 41.5vh;";
	tabStyleString += "border: solid 1px red;";
	tabStyleString += "border-radius: 5px;";
	tabStyleString += "scroll-snap-type: x mandatory;";
	tabStyleString += "margin: 0% auto;";
	tabStyleString += "}";

	tabStyleString += ".anvilletabsContainerChild {";
	tabStyleString += "display: table;";
	tabStyleString += "white-space: nowrap;";
	tabStyleString += "margin: 0% auto;";
	tabStyleString += "}";

	tabStyleString += ".anvilletab {";
	tabStyleString += "display: inline-flex;";
	tabStyleString += "vertical-align: top;";
	tabStyleString += "height: 41.5vh;";
	tabStyleString += "width: 50vw;";
	tabStyleString += "overflow-x: hidden;";
	tabStyleString += "overflow-y: scroll;";
	tabStyleString += "margin: 0%;";
	tabStyleString += "border: solid 1px white;";
	tabStyleString += "border-radius: 4px;";
	tabStyleString += "scroll-snap-align: center;";
	tabStyleString += "scroll-snap-stop: always;";
	tabStyleString += "}";

	tabStyleString += ".anvilletabsContentContainer {";
	tabStyleString += "display: table;";
	tabStyleString += "height: 39vh;";
	tabStyleString += "width: 48vw;";
	tabStyleString += "white-space: normal;";
	tabStyleString += "margin: 1vh 1vw;";
	tabStyleString += "margin-left: auto;";
	tabStyleString += "margin-right: auto;";
	tabStyleString += "background: orange;";
	tabStyleString += "border-radius: 4px;";
	tabStyleString += "}";

	tabStyleString += "#anvillebackgroundTint {";
	tabStyleString += "display: none;";
	tabStyleString += "width: 100vw;";
	tabStyleString += "height: 100vh;";
	tabStyleString += "background-color: #000a;";
	tabStyleString += "position: fixed;";
	tabStyleString += "top: 0;";
	tabStyleString += "left: 0;";
	tabStyleString += "z-index: 9;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopupContainer {";
	tabStyleString += "display: none;";
	tabStyleString += "position: fixed;";
	tabStyleString += "top: 0;";
	tabStyleString += "left: 0;";
	tabStyleString += "height: 100vh;";
	tabStyleString += "width: 100vh;";
	tabStyleString += "z-index: 12;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopupContainerChild {";
	tabStyleString += "display: table-cell;";
	tabStyleString += "vertical-align: middle;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopupContainerChildChild {";
	tabStyleString += "display: table;";
	tabStyleString += "width: 100vw;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopup {";
	tabStyleString += "display: none;";
	tabStyleString += "margin: 0vh auto;";
	tabStyleString += "height: 20vh;";
	tabStyleString += "width: 70vw;";
	tabStyleString += "background: transparent;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopupBorderRow {";
	tabStyleString += "display: table;";
	tabStyleString += "white-space: nowrap;";
	tabStyleString += "}";

	tabStyleString += ".anvilleborderDiv, .anvilleborderDivSpacer {";
	tabStyleString += "display: inline-table;";
	tabStyleString += "height: 10vh;";
	tabStyleString += "background: transparent;";
	tabStyleString += "}";

	tabStyleString += ".anvilleborderDiv {";
	tabStyleString += "width: 15vw;";
	tabStyleString += "}";

	tabStyleString += ".anvilletopLeft {";
	tabStyleString += "border-top: solid 3px gold;";
	tabStyleString += "border-left: solid 3px gold;";
	tabStyleString += "border-radius: 2vh 0vh 0vh 0vh;";
	tabStyleString += "}";

	tabStyleString += ".anvilletopRight {";
	tabStyleString += "border-top: solid 3px gold;";
	tabStyleString += "border-right: solid 3px gold;";
	tabStyleString += "border-radius: 0vh 2vh 0vh 0vh;";
	tabStyleString += "}";

	tabStyleString += ".anvillebottomLeft {";
	tabStyleString += "border-bottom: solid 3px gold;";
	tabStyleString += "border-left: solid 3px gold;";
	tabStyleString += "border-radius: 0vh 0vh 0vh 2vh;";
	tabStyleString += "}";

	tabStyleString += ".anvillebottomRight {";
	tabStyleString += "border-bottom: solid 3px gold;";
	tabStyleString += "border-right: solid 3px gold;";
	tabStyleString += "border-radius: 0vh 0vh 2vh 0vh;";
	tabStyleString += "}";

	tabStyleString += ".anvilleborderDivSpacer {";
	tabStyleString += "width: 40vw;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopupContentContainer {";
	tabStyleString += "display: table;";
	tabStyleString += "width: 40vw;";
	tabStyleString += "height: 40vh;";
	tabStyleString += "background-color: #ffd70022;";
	tabStyleString += "border: solid 1px gold;";
	tabStyleString += "border-radius: 2vh;";
	tabStyleString += "margin: 0vh auto;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopupTitle {";
	tabStyleString += "width: 38vw;";
	tabStyleString += "display: table;";
	tabStyleString += "margin: 1vh auto;";
	tabStyleString += "color: gold;";
	tabStyleString += "font-size: 2vh;";
	tabStyleString += "text-align: center;";
	tabStyleString += "border: none;";
	tabStyleString += "border-bottom: solid 1px gold;";
	tabStyleString += "background: transparent;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopupTitle:focus {";
	tabStyleString += "outline: none;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopupText {";
	tabStyleString += "display: flex;";
	tabStyleString += "flex-direction: column;";
	tabStyleString += "overflow-x: hidden;";
	tabStyleString += "overflow-y: scroll;";
	tabStyleString += "width: 40vw;";
	tabStyleString += "height: 34vh;";
	tabStyleString += "border: solid 1px gold;";
	tabStyleString += "border-radius: 0vh;";
	tabStyleString += "}";

	tabStyleString += ".anvillepopupTextChild {";
	tabStyleString += "font-size: 1.9vh;";
	tabStyleString += "color: gold;";
	tabStyleString += "display: table;";
	tabStyleString += "width: 39vw;";
	tabStyleString += "margin: 0vh auto;";
	tabStyleString += "white-space: normal;";
	tabStyleString += "border: none;";
	tabStyleString += "text-align: start;";
	tabStyleString += "}";


	tabStyleString += ".anvillepopupTextChild li {";
	tabStyleString += "width: 37vw;";
	tabStyleString += "white-space: normal;";
	tabStyleString += "}";
	tabStyleString += ".anvillepopupTextChild code {";
	tabStyleString += "display: table;";
	tabStyleString += "font-size: 1.8vh;";
	tabStyleString += "color: orange;";
	tabStyleString += "background-color: #ffd70010;";
	tabStyleString += "white-space: pre;";
	tabStyleString += "border-radius: 1.5vh;";
	tabStyleString += "}";
	tabStyleString += ".anvillepopupTextChild h6 {";
	tabStyleString += "display: table;";
	tabStyleString += "text-align: center;";
	tabStyleString += "font-size: 2.1vh;";
	tabStyleString += "text-decoration: none;";
	tabStyleString += "padding: 0.5vh 1vw;";
	tabStyleString += "border: dotted 1px orange;";
	tabStyleString += "background-color: #ffd70030;";
	tabStyleString += "margin: 0vh auto;";
	tabStyleString += "margin-top: 1vh;";
	tabStyleString += "}";

	tabStyleString += "#anvillefunctionsListDiv code {";
	tabStyleString += "white-space: pre;";
	tabStyleString += "}";

	tabStyleString += ".anvilleshowHelpButtonsContainer {";
	tabStyleString += "display: table;";
	tabStyleString += "margin: 1vh auto;";
	tabStyleString += "}";

	tabStyleString += ".anvilleshowHelpButtonsContainer input[type=\"button\"] {";
	tabStyleString += "display: inline-table;";
	tabStyleString += "font-size: 1.7vh;";
	tabStyleString += "color: gold;";
	tabStyleString += "padding: 1vh 2vw;";
	tabStyleString += "margin: 0vh 0.4vw;";
	tabStyleString += "width: 18vw;";
	tabStyleString += "border-radius: 1.2vh;";
	tabStyleString += "border: solid 1px gold;";
	tabStyleString += "}";

	tabStyleString += ".anvilleButtons {";
	tabStyleString += "background-color: transparent;";
	tabStyleString += "cursor: pointer;";
	tabStyleString += "user-select: none;";
	tabStyleString += "}";

	tabStyleString += ".anvilleButtons:hover {";
	tabStyleString += "background-color: #ffd70040;";
	tabStyleString += "}";

	tabStyleString += ".anvilleButtons:active {";
	tabStyleString += "background-color: gold;";
	tabStyleString += "}";

	tabStyleString += ".anvillenonSwipableTabs {";
	tabStyleString += "display: none;";
	tabStyleString += "scroll-snap-align: none;";
	tabStyleString += "scroll-snap-stop: none;";
	tabStyleString += "}";

	let tabStyle = document.createElement("style");
	tabStyle.setAttribute("id",  "anvilleTabsAndPopupsStyle");
	tabStyle.innerHTML = tabStyleString;
	 document.body.appendChild(tabStyle);

	let anvillepopupElementsString="<div id=\"anvillebackgroundTint\"></div>";
	
	anvillepopupElementsString += "<div class=\"anvillepopupContainer\">";
	anvillepopupElementsString += "    <div class=\"anvillepopupContainerChild\">";
	anvillepopupElementsString += "        <div class=\"anvillepopupContainerChildChild\">";

	anvillepopupElementsString += "            <div id=\"anvilleerrorDiv\" class=\"anvillepopup\">";
	anvillepopupElementsString += "                <div class=\"anvillepopupBorderRow\">";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvilletopLeft\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDivSpacer\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvilletopRight\"></div>";
	anvillepopupElementsString += "                </div>";
	anvillepopupElementsString += "                <div class=\"anvillepopupContentContainer\">";
	anvillepopupElementsString += "                    <input class=\"anvillepopupTitle\" type=\"text\" value=\"POPUP_TITLE\">";
	anvillepopupElementsString += "                    <div class=\"anvillepopupText anvillehiddenScrollBarElements\">";
	anvillepopupElementsString += "                        <div class=\"anvillepopupTextChild\">";
	anvillepopupElementsString += "                        </div>";
	anvillepopupElementsString += "                    </div>";
	anvillepopupElementsString += "                    <div class=\"anvilleshowHelpButtonsContainer\">";
	anvillepopupElementsString += "                        <input id=\"anvilleShowAllFunctionsButton\" class=\"anvilleButtons\" type=\"button\" value=\"Functions\">";
	anvillepopupElementsString += "                        <input id=\"anvilleShowDocumentationButton\" class=\"anvilleButtons\" type=\"button\" value=\"Documentation\">";
	anvillepopupElementsString += "                    </div>";
	anvillepopupElementsString += "                </div>";
	anvillepopupElementsString += "                <div class=\"anvillepopupBorderRow\">";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvillebottomLeft\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDivSpacer\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvillebottomRight\"></div>";
	anvillepopupElementsString += "                </div>";
	anvillepopupElementsString += "            </div>";

	anvillepopupElementsString += "            <div id=\"anvillefunctionsListDiv\" class=\"anvillepopup\">";
	anvillepopupElementsString += "                <div class=\"anvillepopupBorderRow\">";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvilletopLeft\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDivSpacer\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvilletopRight\"></div>";
	anvillepopupElementsString += "                </div>";
	anvillepopupElementsString += "                <div class=\"anvillepopupContentContainer\">";
	anvillepopupElementsString += "                    <input class=\"anvillepopupTitle\" type=\"text\" value=\"ALL_FUNCTIONS\">";
	anvillepopupElementsString += "                    <div class=\"anvillepopupText anvillehiddenScrollBarElements\">";
	anvillepopupElementsString += "                        <div class=\"anvillepopupTextChild\">";
	anvillepopupElementsString += "    							<code>";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    disableDeduggingDialogs([NO_ARGUMENTS])";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    enableDebuggingDialogs([NO_ARGUMENTS])";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    customiseTabsAndComponentsStyles(\n";
	anvillepopupElementsString += "        customTabsContainerStyleString[OPTIONAL],\n";
	anvillepopupElementsString += "        customTabStyleString[OPTIONAL],\n";
	anvillepopupElementsString += "        customTabContentContainerStyleString[OPTIONAL],\n";
	anvillepopupElementsString += "        customTabButtonsStyleString[OPTIONAL],\n";
	anvillepopupElementsString += "        customTabButtonsHoverStyleString[OPTIONAL],\n";
	anvillepopupElementsString += "        customTabButtonsPressedStyleString[OPTIONAL],\n";
	anvillepopupElementsString += "        customActiveTabButtonStyle[OPTIONAL]\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    addSwipableTabs(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        tabNamesArray,\n";
	anvillepopupElementsString += "        onChangeTabListener[OPTIONAL],\n";
	anvillepopupElementsString += "        tabWidth[OPTIONAL],\n";
	anvillepopupElementsString += "        tabHeight[OPTIONAL]\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    addSwipableTabsWithoutTabButtons(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        onChangeTabListener[OPTIONAL],\n";
	anvillepopupElementsString += "        tabWidth[OPTIONAL],\n";
	anvillepopupElementsString += "        tabHeight[OPTIONAL]\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    addSNonwipableTabs(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        tabNamesArray,\n";
	anvillepopupElementsString += "        onChangeTabListener[OPTIONAL],\n";
	anvillepopupElementsString += "        tabWidth[OPTIONAL],\n";
	anvillepopupElementsString += "        tabHeight[OPTIONAL]\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    getTabButtonsContainer(containerElementID)";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    getTab(containerElementID, tabIndex)";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    getTabContentContainer(containerElementID, tabIndex)";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    removeTab(containerElementID, tabIndex)";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    appendTabContent(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabIndex,\n";
	anvillepopupElementsString += "        elementObject\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    appendTabContentHTML(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabIndex,\n";
	anvillepopupElementsString += "        elementString\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    showListFunctions([NO_ARGUMENTS])";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    showDocumentation([NO_ARGUMENTS])";
	anvillepopupElementsString += "\n\n";
	anvillepopupElementsString += "    							</code>";

	anvillepopupElementsString += "                        </div>";
	anvillepopupElementsString += "                    </div>";
	anvillepopupElementsString += "                </div>";
	anvillepopupElementsString += "                <div class=\"anvillepopupBorderRow\">";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvillebottomLeft\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDivSpacer\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvillebottomRight\"></div>";
	anvillepopupElementsString += "                </div>";
	anvillepopupElementsString += "            </div>";

	anvillepopupElementsString += "            <div id=\"anvilledocumentationDiv\" class=\"anvillepopup\">";
	anvillepopupElementsString += "                <div class=\"anvillepopupBorderRow\">";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvilletopLeft\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDivSpacer\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvilletopRight\"></div>";
	anvillepopupElementsString += "                </div>";
	anvillepopupElementsString += "                <div class=\"anvillepopupContentContainer\">";
	anvillepopupElementsString += "                    <input class=\"anvillepopupTitle\" type=\"text\" value=\"DOCUMENTATION\">";
	anvillepopupElementsString += "                    <div class=\"anvillepopupText anvillehiddenScrollBarElements\">";
	anvillepopupElementsString += "                        <div class=\"anvillepopupTextChild\">";
	anvillepopupElementsString += "                            <h6>1. Types of Tabs in this library.</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                            There are three types of tabs:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <ul>";
	anvillepopupElementsString += "                                <li>Swipable tabs: one can swipe between these tabs and the tabs have corresponding tab buttons.</li>";
	anvillepopupElementsString += "                                <li>Swipable tabs without tab buttons: One can swipe between these tabs but they lack tab buttons.</li>";
	anvillepopupElementsString += "                                <li>Non swipable tabs: These tabs have corresponding tab buttons but one cannot swipe between them.</li>";
	anvillepopupElementsString += "                            </ul>";
	anvillepopupElementsString += "                            <h6>2. Adding tabs to a container element</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                            Any element capable of containing children can be a container element but I <em>strongly recommend</em> that you use a &lt div &gt element for container element. For proper functioning, the container element should be empty and its height and width must be defined prior to addition of tabs. The tabs can be added by calling the methods as shown below:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <ul>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    Adding swipable tabs with tab buttons:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    addSwipableTabs(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        tabNamesArray\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                            Adding swipable tabs without tab buttons:";
	anvillepopupElementsString += "                            <code>";
	anvillepopupElementsString += "    addSwipableTabsWithoutTabButtons(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    Adding non swipable tabs:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    addNonSwipableTabs(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        tabNamesArray\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                            </ul>";
	anvillepopupElementsString += "                            <b>Explaining the arguments</b>";
	anvillepopupElementsString += "                            <ul>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    containerElementID: This is the 'id' attribute value of the element which is to contain the tabs.";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    tabsObjectsArray: This is the collection of HTML objects which are to be the content of the tabs in the order in which they are to be added.";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    tabNamesArray: This is the collection of string data for the creation of the tab buttons for the tabs. They must appear in an order corresponding to that of the tab objects in the previous collection.";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                            </ul>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                These methods can be used to add tabs to an empty element or to an element already containing some tabs.";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <h6>3. Customising the style of the tabs and container</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                The parameters passed to the function below are all string data cotnaining the respective css code. I would strongly recommend that you only customise color, background-color and border selectors of the tab views so as to get the anticipated functioning. In order to understand how the custom styles map to the views, you may have a look at the views hierarchy in number 10 below.";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <code>";
	anvillepopupElementsString += "    customiseTabsAndComponentsStyles(\n";
	anvillepopupElementsString += "        customTabsContainerStyleString,\n";
	anvillepopupElementsString += "        customTabStyleString,\n";
	anvillepopupElementsString += "        customTabContentContainerStyleString,\n";
	anvillepopupElementsString += "        customTabButtonsStyleString,\n";
	anvillepopupElementsString += "        customTabButtonsHoverStyleString,\n";
	anvillepopupElementsString += "        customTabButtonsPressedStyleString,\n";
	anvillepopupElementsString += "        customActiveTabButtonStyle\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                            </code>";
	anvillepopupElementsString += "                            <h6>4. Attach tab change listener</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                The tab change listener is attached during addition of tabs. I would recommend attaching the listener during initial addition only as subsequent attachment overwrites the initial listener and consumes resources that can be saved. Whenever a user changes the tab, the listener is called and the indices of the current and previous tabs are passed to it id est onTabChangeListener(currentTabIndex, previousTabIndex) . The listener can be attached as follows:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <ul>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    For swipable tabs with tabButtons:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    addSwipableTabs(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        tabNamesArray,\n";
	anvillepopupElementsString += "        onChangeTabListener\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    For swipable tabs without tab buttons:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    addSwipableTabsWithoutTabButtons(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        onChangeTabListener\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    For non swipable tabs:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    addNonSwipableTabs(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        tabNamesArray,\n";
	anvillepopupElementsString += "        onChangeTabListener\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                            </ul>";
	anvillepopupElementsString += "                            <h6>5. Getting tab views.</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                One can get the elements involved in the tab views as follows:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <ul>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    Getting tab buttons container:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    getTabButtonsContainer(containerElementID)";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    Getting the tab's root view:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    getTab(containerElementID, tabIndex)";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    Getting the tab's content container, which is the child of the tab's root view:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    getTabContentContainer(containerElementID, tabIndex)";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                            </ul>";
	anvillepopupElementsString += "                            <h6>6. Removing a tab.</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                In order to remove a tab, one can call the removeTab function and pass the id of the container element and the index of the tab as follows:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <code>";
	anvillepopupElementsString += "    removeTab(containerElementID, tabIndex)";
	anvillepopupElementsString += "                            </code>";
	anvillepopupElementsString += "                            <h6>7. Appending tab content</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                To append tab content, one can use one of the two methods for appending tab content. One of the methods accepts html object whereas the other accepts string data which is the html code of the content to be appended. One may append tab content as follows:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <ul>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    Appending tab content by passing the html object to be appended:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    appendTabContent(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabIndex,\n";
	anvillepopupElementsString += "        elementObject\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    Appending tab content by passing the string data containing the html element:";
	anvillepopupElementsString += "                                    <code>";
	anvillepopupElementsString += "    appendTabContentHTML(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabIndex,\n";
	anvillepopupElementsString += "        elementString\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                                    </code>";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                            </ul>";
	anvillepopupElementsString += "                            <h6>8. Viewing this documentation.</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                In order to view this documentation, just call the method below without passing parameters:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <code>";
	anvillepopupElementsString += "    showDocumentation()";
	anvillepopupElementsString += "                            </code>";
	anvillepopupElementsString += "                            <h6>9. Viewing the list of functions for you.</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                In order to view a list of the functions I have made for you, just call the method below without any arguments.";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <code>";
	anvillepopupElementsString += "    showListFunctions()";
	anvillepopupElementsString += "                            </code>";
	anvillepopupElementsString += "                            <h6>10. Hierarchy of views used in this project.</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                The views I used in this project are configured in the following way:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <code>";
	anvillepopupElementsString += "    containerElement\n";
	anvillepopupElementsString += "        tabButtonsContainer\n";
	anvillepopupElementsString += "        tabsContainer\n";
	anvillepopupElementsString += "            tabsContainerChild\n";
	anvillepopupElementsString += "                tab\n";
	anvillepopupElementsString += "                    tabContentContainer\n";
	anvillepopupElementsString += "                            </code>";
	anvillepopupElementsString += "                            <ul>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    containerElement - This is  the element whose id attribute you passed to the methods for addition of tabs. It contains two elements which are added by my functions.";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    tabButtonsContainer - This is the element that contains the tab buttons.";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    tabsContainer - This is the element whose child contains the tabs.";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    tabsContainerChild - This is the element that contains the tabs.";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    tab - This element is the root element of the tab.";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                                <li>";
	anvillepopupElementsString += "                                    tabContentContainer - This is the child of the tab. This is the element that contains your tab's content.";
	anvillepopupElementsString += "                                </li>";
	anvillepopupElementsString += "                            </ul>";
	anvillepopupElementsString += "                            <h6>11. Preventing the display of debugging messages for production</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                While using in production enviroment, one can prevent the display of debugging error popups by calling the method below:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <code>";
	anvillepopupElementsString += "    disableDeduggingDialogs()";
	anvillepopupElementsString += "                            </code>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                To re-enable the debugging popup error messages, one can call the method below:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <code>";
	anvillepopupElementsString += "    enableDebuggingDialogs()";
	anvillepopupElementsString += "                            </code>";
	anvillepopupElementsString += "                            <h6>12. Adding tab dimensions</h6>";
	anvillepopupElementsString += "                            <li>";
	anvillepopupElementsString += "                                Even though I do not recommend this, tab dimensions can be specified during the addition of tabs by providing these as the last two parameters. Please note that if you want to provide the tab dimensions and omit the tab change listener, you must replace the listener with null, \"\" or undefined in order to maintain the order of the arguments. Examples are as follows:";
	anvillepopupElementsString += "                            </li>";
	anvillepopupElementsString += "                            <code>";
	anvillepopupElementsString += "    addSwipableTabs(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        tabNamesArray,\n";
	anvillepopupElementsString += "        onChangeTabListener,\n";
	anvillepopupElementsString += "        tabWidth,\n";
	anvillepopupElementsString += "        tabHeight\n";
	anvillepopupElementsString += "    )\n\n";
	anvillepopupElementsString += "    addSwipableTabsWithoutTabButtons(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        onChangeTabListener,\n";
	anvillepopupElementsString += "        tabWidth,\n";
	anvillepopupElementsString += "        tabHeight\n";
	anvillepopupElementsString += "    )\n\n";
	anvillepopupElementsString += "    addNonSwipableTabs(\n";
	anvillepopupElementsString += "        containerElementID,\n";
	anvillepopupElementsString += "        tabsObjectsArray,\n";
	anvillepopupElementsString += "        tabNamesArray,\n";
	anvillepopupElementsString += "        onChangeTabListener,\n";
	anvillepopupElementsString += "        tabWidth,\n";
	anvillepopupElementsString += "        tabHeight\n";
	anvillepopupElementsString += "    )";
	anvillepopupElementsString += "                            </code>";
	anvillepopupElementsString += "                            <h6>13. THANK YOU VERY VERY VERY MUCH FOR USING MY PRODUCT, IT MEANS A LOT TO ME 🤗. HAVE FUN AND GOOD LUCK. 😎</h6>";
	anvillepopupElementsString += "                        </div>";
	anvillepopupElementsString += "                    </div>";
	anvillepopupElementsString += "                </div>";
	anvillepopupElementsString += "                <div class=\"anvillepopupBorderRow\">";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvillebottomLeft\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDivSpacer\"></div>";
	anvillepopupElementsString += "                    <div class=\"anvilleborderDiv anvillebottomRight\"></div>";
	anvillepopupElementsString += "                </div>";
	anvillepopupElementsString += "            </div>";

	anvillepopupElementsString += "        </div>";
	anvillepopupElementsString += "    </div>";
	anvillepopupElementsString += "</div>";
	
	document.body.innerHTML += anvillepopupElementsString;
}

function customiseTabsAndComponentsStyles(customTabsContainerStyleString, customTabStyleString, customTabContentContainerStyleString, customTabButtonsStyleString, customTabButtonsHoverStyleString, customTabButtonsPressedStyleString, customActiveTabButtonStyle) {
	if(!isAnvilleStyleAdded) {
		appendStyleAndPopupViews();

		isAnvilleStyleAdded = true;
	}

	customTabsContainerStyleString = ".anvilletabsContainer {" + customTabsContainerStyleString + "}";
	
	customTabStyleString = ".anvilletab {" + customTabStyleString + "}";
	customTabContentContainerStyleString = ".anvilletabsContentContainer {" + customTabContentContainerStyleString + "}";
	
	customTabButtonsStyleString = ".anvilletabButtons {" + customTabButtonsStyleString + "}";
	customTabButtonsHoverStyleString = ".anvilletabButtons:hover {" + customTabButtonsHoverStyleString + "}";
	customTabButtonsPressedStyleString = ".anvilletabButtons:active {" + customTabButtonsPressedStyleString + "}";
	customActiveTabButtonStyle = ".anvilletabButtonsActive {" + customActiveTabButtonStyle + "}";

	document.getElementById("anvilleTabsAndPopupsStyle").innerHTML += customTabsContainerStyleString + customTabStyleString + customTabContentContainerStyleString + customTabButtonsStyleString + customTabButtonsHoverStyleString + customTabButtonsPressedStyleString + customActiveTabButtonStyle;
}

function addSwipableTabs(containerElementID, tabsObjectsArray, tabNamesArray, onChangeTabListener, tabWidth, tabHeight) {
	if(!isAnvilleStyleAdded) {
		appendStyleAndPopupViews();

		isAnvilleStyleAdded = true;
	}

	if((!containerElementID || !tabsObjectsArray || !tabNamesArray) || !tabsObjectsArray[0].getAttribute || !tabNamesArray[0]) {
		showError("INVALID ARGUMENTS", "There must have  been a confusion somewhere: both containerElementID, tabsObjectsArray and tabNamesArray are mandatory arguments. tabsObjectsArray must be a collection of HTML objects and tabNamesArray must be a collection of string data 🙂");
		return;
	}

	let containerElement = document.getElementById(containerElementID);
	let dimensionsWereProvided = true;
	if(!tabHeight || !tabWidth) {
		dimensionsWereProvided = false;
		tabWidth = containerElement.clientWidth * 0.98;
		tabHeight = containerElement.offsetHeight;
		//remove container padding i this case so as to avoid unanticipated ugliness
		containerElement.style.padding = "0vh";
	}

	let borderRadius = (0.015 * tabHeight) + "px";
		
	let tabButtonsWidth = (tabWidth * 0.98) / tabNamesArray.length;
	let tabButtonsArray = {length: 0};
	for(let i = 0; i < tabNamesArray.length; i++) {
		let tabButton = document.createElement("input");
		tabButton.setAttribute("class", "anvilletabButtons");
		tabButton.setAttribute("type", "button");
		tabButton.style.width = tabButtonsWidth + "px";
		tabButton.style.maxWidth = tabButtonsWidth + "px";
		tabButton.style.borderRadius = "0px 0px " + borderRadius + " " + borderRadius;
		tabButton.value = tabNamesArray[i];

		tabButtonsArray[i] = tabButton;
		tabButtonsArray["length"] += 1;
	}

	if(containerElement.children.length === 0) {
		let tabButtonsContainer = document.createElement("div");
		tabButtonsContainer.setAttribute("class", "anvilletabButtonsContainer");
		tabButtonsContainer.style.padding = "0vh";
		tabButtonsContainer.style.borderRadius = "0px 0px " + borderRadius + " " + borderRadius;

		for(let z = 0; z < tabButtonsArray.length; z++) {
			
			tabButtonsArray[z].onclick = event => {
				if(containerElementIDs[containerElementID + "currentlyActiveTabButton"] !== z) {
					let scrollWidth;
					scrollWidth = containerElement.offsetWidth * 0.98 * z;

					containerElement.children[1].scrollTo({
						top: 0,
						left: scrollWidth,
						behavior: "smooth"
					});
				}
			}

			tabButtonsContainer.appendChild(tabButtonsArray[z]);
		}

		let tabsContainer = document.createElement("div");
		tabsContainer.setAttribute("class", "anvilletabsContainer anvillehiddenScrollBarElements");
		tabsContainer.style.height = (0.83 * tabHeight) + "px";
		tabsContainer.style.width = tabWidth + "px";
		tabsContainer.style.borderRadius = borderRadius;
		tabsContainer.onscroll = (event) => {
			//loop over all elements and get the one thich has been scrolled upon
			//get the currently active tab from the global list
			for(let y = 0; y < tabsContainer.children[0].children.length; y++) {
				if(tabsContainer.children[0].children[y].children[0].getBoundingClientRect().left > tabsContainer.getBoundingClientRect().left && tabsContainer.children[0].children[y].children[0].getBoundingClientRect().right < tabsContainer.getBoundingClientRect().right) {
					if(containerElementIDs[containerElementID + "currentlyActiveTabButton"] !== y) {
						if(containerElementIDs[containerElementID + "currentlyActiveTabButton"] !== -1) {
							if(containerElement.children[0].children[(containerElementIDs[containerElementID + "currentlyActiveTabButton"])]) {
								containerElement.children[0].children[(containerElementIDs[containerElementID + "currentlyActiveTabButton"])].setAttribute("class", "anvilletabButtons");
							}
						}
						containerElement.children[0].children[y].setAttribute("class", "anvilletabButtons anvilletabButtonsActive");
						if(onChangeTabListener) {
							onChangeTabListener(y, containerElementIDs[containerElementID + "currentlyActiveTabButton"]);
						}
						containerElementIDs[containerElementID + "currentlyActiveTabButton"] = y;
					}
					return;
				}
			}
		};
		let tabsContainerChild = document.createElement("div");
		tabsContainerChild.setAttribute("class", "anvilletabsContainerChild");
		for(let i = 0; i < tabsObjectsArray.length; i++) {
			let tab = document.createElement("div");
			tab.setAttribute("class", "anvilletab anvillehiddenScrollBarElements");
			tab.style.height = (0.83 * tabHeight) + "px";
			tab.style.width = tabWidth + "px";
			let tabsContentContainer = document.createElement("div");
			tabsContentContainer.setAttribute("class", "anvilletabsContentContainer");
			tabsContentContainer.style.height = (0.78 * tabHeight) + "px";
			tabsContentContainer.style.width = (0.96 * tabWidth) + "px";
			tabsContentContainer.style.borderRadius = borderRadius;
			tabsContentContainer.appendChild(tabsObjectsArray[i]);
			tab.appendChild(tabsContentContainer);
			tabsContainerChild.appendChild(tab);
		}
		tabsContainer.appendChild(tabsContainerChild);

		containerElement.appendChild(tabButtonsContainer);
		containerElement.appendChild(tabsContainer);
		containerElementIDs[containerElementIDs.length] = containerElementID;
		if(dimensionsWereProvided) {
			containerElementIDs[containerElementID + "widthRatio"] = tabWidth / containerElement.offsetWidth;
			containerElementIDs[containerElementID + "heightRatio"] = tabHeight / containerElement.offsetHeight;
		}
		containerElementIDs[containerElementID + "currentlyActiveTabButton"] = 0;
		tabButtonsContainer.children[0].setAttribute("class", "anvilletabButtons anvilletabButtonsActive");
		containerElementIDs.length += 1;
	} else {
		if(containerElementIDs[containerElementID + "tabType"] === "nonSwipable") {
			showError("INVALID CONTAINER ELEMENT", "There must have been a confusion: the containerElementID(" + containerElementID + ") that was provided contains nonSwipable tabs whereas this method is for addition of swipable tabs. Please do not modify the children of the containerElement directly.🙂");
			return;
		} else if(containerElement.children.length === 1) {
			showError("INVALID CONTAINER ELEMENT", "There must have been a confusion: the containerElementID(" + containerElementID + ") that was provided seems to be containing swipable tabs without tabButtons yet this method is for addition of swipable tabs (with tabButtons). Please do not modify the children of the containerElement directly.🙂")
			return;
		}

		let initialTabsCount = containerElement.children[0].children.length;

		for(let z = 0; z < tabButtonsArray.length; z++) {
			
			tabButtonsArray[z].onclick = event => {
				if(containerElementIDs[containerElementID + "currentlyActiveTabButton"] !== (z + initialTabsCount)) {
					let scrollWidth;
					scrollWidth = containerElement.offsetWidth * 0.98 * (z + initialTabsCount);

					containerElement.children[1].scrollTo({
						top: 0,
						left: scrollWidth,
						behavior: "smooth"
					});
				}
			}

			containerElement.children[0].appendChild(tabButtonsArray[z]);
		}

		let newTabButtonsWidth = tabWidth / containerElement.children[0].children.length;

		for(let y = 0; y < containerElement.children[0].children.length; y++) {
			containerElement.children[0].children[y].style.width = newTabButtonsWidth + "px";
		}


		for(let i = 0; i < tabsObjectsArray.length; i++) {
			let tab = document.createElement("div");
			tab.setAttribute("class", "anvilletab anvillehiddenScrollBarElements");
			tab.style.height = (0.83 * tabHeight) + "px";
			tab.style.width = tabWidth + "px";
			let tabsContentContainer = document.createElement("div");
			tabsContentContainer.setAttribute("class", "anvilletabsContentContainer");
			tabsContentContainer.style.height = (0.78 * tabHeight) + "px";
			tabsContentContainer.style.width = (0.96 * tabWidth) + "px";
			tabsContentContainer.style.borderRadius = borderRadius;
			tabsContentContainer.appendChild(tabsObjectsArray[i]);
			tab.appendChild(tabsContentContainer);
			containerElement.children[1].children[0].appendChild(tab);
		}
	}
	containerElementIDs[containerElementID + "tabButtonsAmount"] = containerElement.children[0].children.length;
}

function addSwipableTabsWithoutTabButtons(containerElementID, tabsObjectsArray, onChangeTabListener, tabWidth, tabHeight) {
	if(!isAnvilleStyleAdded) {
		appendStyleAndPopupViews();

		isAnvilleStyleAdded = true;
	}

	if((!containerElementID || !tabsObjectsArray) || !tabsObjectsArray[0].getAttribute) {
		showError("INVALID ARGUMENTS", "There must have been a confusion somewhere: containerElementID must be string and tabsObjectsArray must be a collection of HTML objects and must not be empty 🙂.");
		return;
	}

	let containerElement = document.getElementById(containerElementID);
	let dimensionsWereProvided = true;
	if(!tabHeight || !tabWidth) {
		dimensionsWereProvided = false;
		tabWidth = containerElement.clientWidth * 0.98;
		tabHeight = containerElement.offsetHeight;
		containerElement.style.padding = "0vh";
	}

	let borderRadius = (0.015 * tabHeight) + "px";

	if(containerElement.children.length === 0) {
		let tabsContainer = document.createElement("div");
		tabsContainer.setAttribute("class", "anvilletabsContainer anvillehiddenScrollBarElements");
		tabsContainer.style.height = (0.83 * tabHeight) + "px";
		tabsContainer.style.width = tabWidth + "px";
		tabsContainer.style.borderRadius = borderRadius;
		tabsContainer.onscroll = (event) => {
			for(let y = 0; y < tabsContainer.children[0].children.length; y++) {
				if(tabsContainer.children[0].children[y].children[0].getBoundingClientRect().left > tabsContainer.getBoundingClientRect().left && tabsContainer.children[0].children[y].children[0].getBoundingClientRect().right < tabsContainer.getBoundingClientRect().right) {
					if(containerElementIDs[containerElementID + "currentlyActiveTab"] !== y) {
						if(onChangeTabListener) {
							onChangeTabListener(containerElementIDs[containerElementID + "currentlyActiveTab"], y);
						}
						containerElementIDs[containerElementID + "currentlyActiveTab"] = y;
					}
					return;
				}
			}
		};
		let tabsContainerChild = document.createElement("div");
		tabsContainerChild.setAttribute("class", "anvilletabsContainerChild");
		for(let i = 0; i < tabsObjectsArray.length; i++) {
			let tab = document.createElement("div");
			tab.setAttribute("class", "anvilletab anvillehiddenScrollBarElements");
			tab.style.height = (0.83 * tabHeight) + "px";
			tab.style.width = tabWidth + "px";
			let tabsContentContainer = document.createElement("div");
			tabsContentContainer.setAttribute("class", "anvilletabsContentContainer");
			tabsContentContainer.style.height = (0.78 * tabHeight) + "px";
			tabsContentContainer.style.width = (0.96 * tabWidth) + "px";
			tabsContentContainer.style.borderRadius = borderRadius;
			tabsContentContainer.appendChild(tabsObjectsArray[i]);
			tab.appendChild(tabsContentContainer);
			tabsContainerChild.appendChild(tab);
		}
		tabsContainer.appendChild(tabsContainerChild);

		containerElement.appendChild(tabsContainer);
		containerElementIDs[containerElementIDs.length] = containerElementID;
		if(dimensionsWereProvided) {
			containerElementIDs[containerElementID + "widthRatio"] = tabWidth / containerElement.offsetWidth;
			containerElementIDs[containerElementID + "heightRatio"] = tabHeight / containerElement.offsetHeight;
		}
		containerElementIDs[containerElementID + "currentlyActiveTab"] = 0;
		containerElementIDs.length += 1;
	} else {
		if(containerElementIDs[containerElementID + "tabType"] === "nonSwipable") {
			showError("INVALID CONTAINER ELEMENT", "There must have been a confusion: the containerElementID(" + containerElementID + ") that was provided contains nonSwipable tabs whereas this method is for addition of swipable tabs without tabButtons. Please don not modify the children of the containerElement directly.🙂");
			return;
		} else if(containerElement.children.length >= 0) {
			showError("INVALID CONTAINER ELEMENT", "There must have been a confusion: The provided containerElementID(" + containerElementID + ") seems to be containing swipable(with tabButtons) tabs whereas this method is for addition of swipable tabs WITHOUT tabButtons. Please don not modify the children of the containerElement directly. 🙂");
			return;
		}
		
		for(let i = 0; i < tabsObjectsArray.length; i++) {
			let tab = document.createElement("div");
			tab.setAttribute("class", "anvilletab anvillehiddenScrollBarElements");
			tab.style.height = (0.83 * tabHeight) + "px";
			tab.style.width = tabWidth + "px";
			let tabsContentContainer = document.createElement("div");
			tabsContentContainer.setAttribute("class", "anvilletabsContentContainer");
			tabsContentContainer.style.height = (0.78 * tabHeight) + "px";
			tabsContentContainer.style.width = (0.96 * tabWidth) + "px";
			tabsContentContainer.style.borderRadius = borderRadius;
			tabsContentContainer.appendChild(tabsObjectsArray[i]);
			tab.appendChild(tabsContentContainer);
			containerElement.children[0].children[0].appendChild(tab);
		}
	}
}

function addNonSwipableTabs(containerElementID, tabsObjectsArray, tabNamesArray, onChangeTabListener, tabWidth, tabHeight) {
	if(!isAnvilleStyleAdded) {
		appendStyleAndPopupViews();
		isAnvilleStyleAdded = true;
	}

	let containerElement = document.getElementById(containerElementID);
	let dimensionsWereProvided = true;
	if(!tabHeight || !tabWidth) {
		dimensionsWereProvided = false;
		tabWidth = containerElement.clientWidth * 0.98;
		tabHeight = containerElement.offsetHeight;
		containerElement.style.padding = "0vh";
	}

	if((!containerElementID || !tabsObjectsArray || !tabNamesArray) || !tabsObjectsArray[0].getAttribute || !tabNamesArray[0]) {
		showError("INVALID ARGUMENTS", "There must have  been a confusion somewhere: both containerElementID, tabsObjectsArray and tabNamesArray are mandatory arguments. tabsObjectsArray must be a collection of HTML objects and tabNamesArray must be a collection of string data 🙂");
		return;
	}

	let borderRadius = (0.015 * tabHeight) + "px";
		
	let tabButtonsWidth = (tabWidth * 0.98) / tabNamesArray.length;
	let tabButtonsArray = {length: 0};
	for(let i = 0; i < tabNamesArray.length; i++) {
		let tabButton = document.createElement("input");
		tabButton.setAttribute("class", "anvilletabButtons");
		tabButton.setAttribute("type", "button");
		tabButton.style.width = tabButtonsWidth + "px";
		tabButton.style.maxWidth = tabButtonsWidth + "px";
		tabButton.style.borderRadius = "0px 0px " + borderRadius + " " + borderRadius;
		tabButton.value = tabNamesArray[i];

		tabButtonsArray[i] = tabButton;
		tabButtonsArray["length"] += 1;
	}

	let containerElementWasEmpty = false;

	if(containerElement.children.length === 0) {
		containerElementWasEmpty = true;

		let tabButtonsContainer = document.createElement("div");
		tabButtonsContainer.setAttribute("class", "anvilletabButtonsContainer");
		tabButtonsContainer.style.padding = "0vh";
		tabButtonsContainer.style.borderRadius = "0px 0px " + borderRadius + " " + borderRadius;

		for(let z = 0; z < tabButtonsArray.length; z++) {
			
			tabButtonsArray[z].onclick = event => {
				let index = containerElementIDs[containerElementID + "currentlyActiveTabButton"];
				if(index !== z && index !== -1) {
					containerElement.children[index + 1].style.display = "none";
					containerElement.children[z + 1].style.display = "flex";

					containerElement.children[0].children[index].setAttribute("class", "anvilletabButtons");
					containerElement.children[0].children[z].setAttribute("class", "anvilletabButtons anvilletabButtonsActive");

					if(onChangeTabListener) {
						onChangeTabListener(z, containerElementIDs[containerElementID + "currentlyActiveTabButton"]);
					}
					containerElementIDs[containerElementID + "currentlyActiveTabButton"] = z;
				} else if (index === -1 && z === 0) {
					containerElement.children[z + 1].style.display = "flex";

					containerElement.children[0].children[z].setAttribute("class", "anvilletabButtons anvilletabButtonsActive");

					containerElementIDs[containerElementID + "currentlyActiveTabButton"] = z;
				}
			}

			tabButtonsContainer.appendChild(tabButtonsArray[z]);
		}

		containerElement.appendChild(tabButtonsContainer);

		containerElementIDs[containerElementIDs.length] = containerElementID;
		if(dimensionsWereProvided) {
			containerElementIDs[containerElementID + "widthRatio"] = tabWidth / containerElement.offsetWidth;
			containerElementIDs[containerElementID + "heightRatio"] = tabHeight / containerElement.offsetHeight;
		}
		containerElementIDs[containerElementID + "currentlyActiveTabButton"] = -1;
		containerElementIDs[containerElementID + "tabType"] = "nonSwipable";
		containerElementIDs.length += 1;
	} else {
		if(containerElementIDs[containerElementID + "tabType"] !== "nonSwipable") {
			showError("INVALID CONTAINER ELEMENT", "There must have been a confusion: the containerElementID(" + containerElementID + ") that was provided contains swipable tabs whereas this method is for addition of nonSwipable tabs.🙂");
			return;
		}
		
		let initialTabsCount = containerElement.children[0].children.length;

		for(let z = 0; z < tabButtonsArray.length; z++) {
			
			tabButtonsArray[z].onclick = event => {
				let index = containerElementIDs[containerElementID + "currentlyActiveTabButton"];
				if(index !== (z + initialTabsCount)) {
					containerElement.children[index + 1].style.display = "none";
					containerElement.children[z + 1 + initialTabsCount].style.display = "table";

					containerElement.children[0].children[index].setAttribute("class", "anvilletabButtons");
					containerElement.children[0].children[z + initialTabsCount].setAttribute("class", "anvilletabButtons anvilletabButtonsActive");

					containerElementIDs[containerElementID + "currentlyActiveTabButton"] = z + initialTabsCount;
				}
			}

			containerElement.children[0].appendChild(tabButtonsArray[z]);
		}

		let newTabButtonsWidth = tabWidth / containerElement.children[0].children.length;

		for(let y = 0; y < containerElement.children[0].children.length; y++) {
			containerElement.children[0].children[y].style.width = newTabButtonsWidth + "px";
			containerElement.children[0].children[y].style.maxWidth = newTabButtonsWidth + "px";
		}

	}

	for(let i = 0; i < tabsObjectsArray.length; i++) {
		let tab = document.createElement("div");
		tab.setAttribute("class", "anvilletab anvillenonSwipableTabs  anvillehiddenScrollBarElements");
		tab.style.height = (0.83 * tabHeight) + "px";
		tab.style.width = tabWidth + "px";
		let tabsContentContainer = document.createElement("div");
		tabsContentContainer.setAttribute("class", "anvilletabsContentContainer");
		tabsContentContainer.style.height = (0.78 * tabHeight) + "px";
		tabsContentContainer.style.width = (0.96 * tabWidth) + "px";
		tabsContentContainer.style.borderRadius = borderRadius;
		tabsContentContainer.appendChild(tabsObjectsArray[i]);
		tab.appendChild(tabsContentContainer);
		containerElement.appendChild(tab);
	}

	if(containerElementWasEmpty) {
		containerElement.children[0].children[0].click();
		containerElementWasEmpty = false;
	}

	containerElementIDs[containerElementID + "tabButtonsAmount"] = containerElement.children[0].children.length;
}

function getTabButtonsContainer(containerElementID) {
	let containerElement = document.getElementById(containerElementID);
	if(containerElement.children.length >= 2) {
		return containerElement.children[0];
	}
}

function getTab(containerElementID, tabIndex) {
	let containerElement = document.getElementById(containerElementID);
	if(containerElement.children.length >= 2) {
		if(containerElementIDs[containerElementID + "tabType"] === "nonSwipable") {
			return containerElement.children[tabIndex + 1];
		} else {
			return containerElement.children[1].children[0].children[tabIndex];
		}
	} else {
		return containerElement.children[0].children[0].children[tabIndex];
	}
}

function getTabContentContainer(containerElementID, tabIndex) {
	let containerElement = document.getElementById(containerElementID);
	if(containerElement.children.length >= 2) {
		if(containerElementIDs[containerElementID + "tabType"] === "nonSwipable") {
			return containerElement.children[tabIndex + 1].children[0];
		} else {
			return containerElement.children[1].children[0].children[tabIndex].children[0];
		}
	} else {
		return containerElement.children[0].children[0].children[tabIndex].children[0];
	}
}

function removeTab(containerElementID, tabIndex) {
	let containerElement = document.getElementById(containerElementID);

	if(containerElementIDs[containerElementID + "tabButtonsAmount"]) {
		containerElement.children[0].removeChild(containerElement.children[0].children[tabIndex]);
		//containerElementIDs[containerElementID + "currentlyActiveTabButton"] = tabIndex;

		if(containerElementIDs[containerElementID + "tabType"] === "nonSwipable") {
			for(let z = 0; z < containerElement.children[0].children.length; z++) {
				containerElement.children[0].children[z].onclick = () => {
					let index = containerElementIDs[containerElementID + "currentlyActiveTabButton"];
					if(index !== z && index !== -1) {
						containerElement.children[index + 1].style.display = "none";
						containerElement.children[z + 1].style.display = "flex";

						containerElement.children[0].children[index].setAttribute("class", "anvilletabButtons");
						containerElement.children[0].children[z].setAttribute("class", "anvilletabButtons anvilletabButtonsActive");

						containerElementIDs[containerElementID + "currentlyActiveTabButton"] = z;
					} else if (index === -1 && z === 0) {
						containerElement.children[z + 1].style.display = "flex";

						containerElement.children[0].children[z].setAttribute("class", "anvilletabButtons anvilletabButtonsActive");

						containerElementIDs[containerElementID + "currentlyActiveTabButton"] = z;
					}
				}
			}
			containerElement.removeChild(containerElement.children[tabIndex + 1]);
		} else {
			containerElement.children[1].children[0].removeChild(containerElement.children[1].children[0].children[tabIndex]);
			for(let z = 0; z < containerElement.children[0].children.length; z++) {
				containerElement.children[0].children[z].onclick = () => {
					if(containerElementIDs[containerElementID + "currentlyActiveTabButton"] !== z || containerElementIDs[containerElementID + "justRemovedElement"]) {
						let scrollWidth;
						scrollWidth = containerElement.offsetWidth * 0.98 * z;

						containerElement.children[1].scrollTo({
							top: 0,
							left: scrollWidth,
							behavior: "smooth"
						});

						if(containerElementIDs[containerElementID + "justRemovedElement"]) {
							containerElement.children[0].children[z].setAttribute("class", "anvilletabButtons anvilletabButtonsActive")
						}
					}
				}
			}

			containerElementIDs[containerElementID + "justRemovedElement"] = true;
		}

		if(containerElementIDs[containerElementID + "currentlyActiveTabButton"] === tabIndex) {
			if(containerElement.children[0].children[tabIndex]) {
				containerElementIDs[containerElementID + "currentlyActiveTabButton"] = tabIndex - 1;
				containerElement.children[0].children[tabIndex].click();
			} else if(containerElement.children[0].children[tabIndex - 1]) {
				containerElementIDs[containerElementID + "currentlyActiveTabButton"] = tabIndex - 2;
				containerElement.children[0].children[tabIndex - 1].click();
			}
		}

		let newTabButtonsWidth = containerElement.offsetWidth * 0.98 / containerElement.children[0].children.length;
		for(let y = 0; y < containerElement.children[0].children.length; y++) {
			containerElement.children[0].children[y].style.width = newTabButtonsWidth + "px";
			containerElement.children[0].children[y].style.maxWidth = newTabButtonsWidth + "px";
		}

		containerElementIDs[containerElementID + "tabButtonsAmount"] = containerElement.children[0].children.length;

	} else {
		containerElement.children[0].children[0].removeChild(containerElement.children[0].children[0].children[tabIndex]);
	}
}

function appendTabContent(containerElementID, tabIndex, elementObject) {
	containerElement = document.getElementById(containerElementID);

	if(containerElementIDs[containerElementID + "tabButtonsAmount"]) {
		if(containerElementIDs[containerElementID + "tabType"] === "nonSwipable") {
			containerElement.children[tabIndex + 1].children[0].appendChild(elementObject);
		} else {
			containerElement.children[1].children[0].children[tabIndex].children[0].appendChild(elementObject);
		}
	} else {
		containerElement.children[0].children[0].children[tabIndex].children[0].appendChild(elementObject);
	}
}

function appendTabContentHTML(containerElementID, tabIndex, elementString) {
	containerElement = document.getElementById(containerElementID);

	if(containerElementIDs[containerElementID + "tabButtonsAmount"]) {
		if(containerElementIDs[containerElementID + "tabType"] === "nonSwipable") {
			containerElement.children[tabIndex + 1].children[0].innerHTML += elementString;
		} else {
			containerElement.children[1].children[0].children[tabIndex].children[0].innerHTML += elementString;
		}
	} else {
		containerElement.children[0].children[0].children[tabIndex].children[0].innerHTML += elementString;
	}
}

function resizeTabElementsOnWindowResize() {
	window.addEventListener("resize", (event) => {
		if(containerElementIDs.length > 0) {
			for(let i = 0; i < containerElementIDs.length; i++) {
				let containerElement = document.getElementById(containerElementIDs[i]);
				let tabWidth = containerElement.offsetWidth * 0.98;
				let tabHeight = containerElement.offsetHeight;
				if(containerElementIDs[containerElementIDs[i] + "widthRatio"]) {
					tabWidth *= containerElementIDs[containerElementIDs[i] + "widthRatio"] / 0.98;
					tabHeight *= containerElementIDs[containerElementIDs[i] + "heightRatio"];
				}
				let borderRadius = (0.015 * tabHeight) + "px";
				let tabsContainer;

				//tabButtons
				if(containerElementIDs[containerElementIDs[i] + "tabButtonsAmount"]) {
					let tabButtonsContainer = containerElement.children[0];
					tabButtonsContainer.style.borderRadius = "0px 0px " + borderRadius + " " + borderRadius;
					let tabButtonsWidth = (tabWidth * 0.98) / containerElementIDs[containerElementIDs[i] + "tabButtonsAmount"];
					for(let x = 0; x < tabButtonsContainer.children.length; x++) {
						tabButtonsContainer.children[x].style.width = tabButtonsWidth + "px";
						tabButtonsContainer.children[x].style.maxWidth = tabButtonsWidth + "px";
						tabButtonsContainer.children[x].style.borderRadius = "0px 0px " + borderRadius + " " + borderRadius;
					}

					tabsContainer = containerElement.children[1];
				} else {
					tabsContainer = containerElement.children[0];
				}
				//tabscontainer
				if(containerElementIDs[containerElementIDs[i] + "tabType"] === "nonSwipable") {
					for(let j = 1; j < containerElement.children.length; j++) {
						containerElement.children[j].style.width = tabWidth + "px";
						containerElement.children[j].style.height = (0.83 * tabHeight) + "px";
						containerElement.children[j].children[0].style.width = (0.96 * tabWidth) + "px";
						containerElement.children[j].children[0].style.height = (0.78 * tabHeight) + "px";
						containerElement.children[j].children[0].style.borderRadius = borderRadius;
					}
				} else {
					tabsContainer.style.width = tabWidth + "px";
					tabsContainer.style.height = (0.83 * tabHeight) + "px";
					tabsContainer.style.borderRadius = borderRadius;
					let tabsContainerChild = tabsContainer.children[0];
					for(let j = 0; j < tabsContainerChild.children.length; j++) {
						//tab
						tabsContainerChild.children[j].style.width = tabWidth + "px";
						tabsContainerChild.children[j].style.height = (0.83 * tabHeight) + "px";
						//tabsContentContainer
						tabsContainerChild.children[j].children[0].style.width = (0.96 * tabWidth) + "px";
						tabsContainerChild.children[j].children[0].style.height = (0.78 * tabHeight) + "px";
						tabsContainerChild.children[j].children[0].style.borderRadius = borderRadius;
					}
				}
			}
		}
	})
}

resizeTabElementsOnWindowResize();

var currentVisiblePopup;
function showError(errorTitle, errorMessage) {
	if(showDebugDialogMessages) {
		if(!isAnvilleStyleAdded) {
			appendStyleAndPopupViews();
			isAnvilleStyleAdded = true;
		}

		let anvillebackgroundTint = document.getElementById("anvillebackgroundTint");
		let anvillepopupContainer = document.getElementsByClassName("anvillepopupContainer")[0];
		let anvilleerrorDiv = document.getElementById("anvilleerrorDiv");

		anvilleerrorDiv.children[1].children[0].value = errorTitle;
		anvilleerrorDiv.children[1].children[1].children[0].innerText = errorMessage;

		anvillebackgroundTint.style.display = "table";
		anvillepopupContainer.style.display = "table";
		anvilleerrorDiv.style.display = "table";

		if(!currentVisiblePopup) {
			//initial show thus set button click listeners
			anvillebackgroundTint.onclick = () => {
				anvillebackgroundTint.style.display = "none";
				anvillepopupContainer.style.display = "none";
				currentVisiblePopup.style.display = "none";
			}

			anvillepopupContainer.onclick = (event) => {
				let eventTargetClass = event.target.getAttribute("class");
				if(eventTargetClass === "anvillepopupContainer" || eventTargetClass === "anvillepopup" || eventTargetClass === "anvillepopupContainerChild" || eventTargetClass === "anvillepopupContainerChildChild" || eventTargetClass.indexOf("anvilleborderDivSpacer") >= 0) {
					anvillebackgroundTint.click();
				}
			}

			let anvilleShowAllFunctionsButton = document.getElementById("anvilleShowAllFunctionsButton");
			anvilleShowAllFunctionsButton.onclick = () => {
				anvillebackgroundTint.click();
				showListFunctions();
			}

			let anvilleShowDocumentationButton = document.getElementById("anvilleShowDocumentationButton");
			anvilleShowDocumentationButton.onclick = () => {
				anvillebackgroundTint.click();
				showDocumentation();
			}
		}
		currentVisiblePopup = anvilleerrorDiv;
	}
}

function showListFunctions() {
	if(showDebugDialogMessages) {
		if(!isAnvilleStyleAdded) {
			appendStyleAndPopupViews();
			isAnvilleStyleAdded = true;
		}

		let anvillebackgroundTint = document.getElementById("anvillebackgroundTint");
		let anvillepopupContainer = document.getElementsByClassName("anvillepopupContainer")[0];
		let anvillefunctionsListDiv = document.getElementById("anvillefunctionsListDiv");

		anvillebackgroundTint.style.display = "table";
		anvillepopupContainer.style.display = "table";
		anvillefunctionsListDiv.style.display = "table";

		if(!currentVisiblePopup) {
			//initial show thus set button click listeners
			anvillebackgroundTint.onclick = () => {
				anvillebackgroundTint.style.display = "none";
				anvillepopupContainer.style.display = "none";
				currentVisiblePopup.style.display = "none";
			}

			anvillepopupContainer.onclick = (event) => {
				let eventTargetClass = event.target.getAttribute("class");
				if(eventTargetClass === "anvillepopupContainer" || eventTargetClass === "anvillepopup" || eventTargetClass === "anvillepopupContainerChild" || eventTargetClass === "anvillepopupContainerChildChild" || eventTargetClass.indexOf("anvilleborderDivSpacer") >= 0) {
					anvillebackgroundTint.click();
				}
			}

			let anvilleShowAllFunctionsButton = document.getElementById("anvilleShowAllFunctionsButton");
			anvilleShowAllFunctionsButton.onclick = () => {
				anvillebackgroundTint.click();
				showListFunctions();
			}

			let anvilleShowDocumentationButton = document.getElementById("anvilleShowDocumentationButton");
			anvilleShowDocumentationButton.onclick = () => {
				anvillebackgroundTint.click();
				showDocumentation();
			}
		}
		currentVisiblePopup = anvillefunctionsListDiv;
	}
}

function showDocumentation() {
	if(showDebugDialogMessages) {
		if(!isAnvilleStyleAdded) {
			appendStyleAndPopupViews();
			isAnvilleStyleAdded = true;
		}

		let anvillebackgroundTint = document.getElementById("anvillebackgroundTint");
		let anvillepopupContainer = document.getElementsByClassName("anvillepopupContainer")[0];
		let anvilledocumentationDiv = document.getElementById("anvilledocumentationDiv");

		anvillebackgroundTint.style.display = "table";
		anvillepopupContainer.style.display = "table";
		anvilledocumentationDiv.style.display = "table";

		if(!currentVisiblePopup) {
			//initial show thus set button click listeners
			anvillebackgroundTint.onclick = () => {
				anvillebackgroundTint.style.display = "none";
				anvillepopupContainer.style.display = "none";
				currentVisiblePopup.style.display = "none";
			}

			anvillepopupContainer.onclick = (event) => {
				let eventTargetClass = event.target.getAttribute("class");
				if(eventTargetClass === "anvillepopupContainer" || eventTargetClass === "anvillepopup" || eventTargetClass === "anvillepopupContainerChild" || eventTargetClass === "anvillepopupContainerChildChild" || eventTargetClass.indexOf("anvilleborderDivSpacer") >= 0) {
					anvillebackgroundTint.click();
				}
			}

			let anvilleShowAllFunctionsButton = document.getElementById("anvilleShowAllFunctionsButton");
			anvilleShowAllFunctionsButton.onclick = () => {
				anvillebackgroundTint.click();
				showListFunctions();
			}

			let anvilleShowDocumentationButton = document.getElementById("anvilleShowDocumentationButton");
			anvilleShowDocumentationButton.onclick = () => {
				anvillebackgroundTint.click();
				showDocumentation();
			}
		}
		currentVisiblePopup = anvilledocumentationDiv;
	}
}
