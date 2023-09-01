import React from "react";
import {shallow} from "enzyme";
import Header from "./Header";
import {Typography} from "@material-ui/core";

describe("Basic rendering of header component" , () =>{
    it("Should render Daily Needs in header", () => {
        const headerComponent = shallow(
          <Header/>
        );
        const typographyComponentList = headerComponent.find(Typography);
        const typographyComponent = typographyComponentList.at(0);

        expect(typographyComponentList.length).toBe(3);
        expect(typographyComponent.text()).toBe("Daily Needs");
      });

      it("Should render links to the priceList and Bill", () => {
        const headerComponent = shallow(
          <Header/>
        );
        const typographyComponentList = headerComponent.find(Typography);
        const priceListTypographyComponent = typographyComponentList.at(1);
        const billTypographyComponent = typographyComponentList.at(2);

        
        expect(typographyComponentList.length).toBe(3);
        expect(priceListTypographyComponent.text()).toBe("Price List");
        expect(billTypographyComponent.text()).toBe("Bill");
      });
} 
)