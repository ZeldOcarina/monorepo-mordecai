import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { buildLink } from "../helpers/helpers"

import AppContext from "../context/AppContext"
import Navbar from "./Navbar"
import MobileNavbar from "./MobileNavbar"
import Footer from "./Footer"

import SliderSection from "../components/SliderSection"
import ContactsSection from "../components/ContactsSection"
import Map from "../components/Map"
import DgpStripe from "../components/DgpStripe"
import BeforeAndAfter from "../components/BeforeAndAfter"

import ImagesSection from "../components/ImagesSection"
import SocialFeed from "../components/SocialFeed"
import LocationBanner from "./LocationBanner"

function organizeMenu(categoriesData, cityState) {
  const categories = new Set()
  const organizedMenuData = {}

  const sortedCategoriesData = categoriesData.sort((a, b) => {
    return a.data.rowNumber - b.data.rowNumber
  })

  sortedCategoriesData.forEach(category => {
    //if (category.data.Parent === "Home") return
    if (category.data.Parent && category.data.Permalink)
      categories.add(category.data.Parent)
  })

  // // Inspect categories and console log each item
  // categories.forEach(category => {
  //   console.log({ category })
  // })

  categories.forEach(category => {
    organizedMenuData[category] = []
  })

  sortedCategoriesData.forEach(navItem => {
    //if (navItem.data.Parent === "Home") return
    if (!organizedMenuData[navItem.data.Parent]) return
    organizedMenuData[navItem.data.Parent].push({
      link: buildLink(navItem.data.Permalink, cityState),
      name: navItem.data.Child,
      category: navItem.data.Parent,
    })
  })

  const noLogoCategoriesData = categoriesData.filter(
    //item => item.data.Parent !== "Home"
    item => item,
  )

  return { categories: [...categories], menuData: noLogoCategoriesData }
}

const Layout = ({ children }) => {
  const {
    whiteLogoData: { whiteLogoData },
    whiteLogoSizeData,
    addressData: { addressData },
    allAddressedData: { allAddressedData },
    cityData: { cityData },
    stateData: { stateData },
    cityStateData: { cityStateData },
    zipCodeData: { zipCodeData },
    categoriesData: { categoriesData },
    phoneData: { phoneData },
    telData: { telData },
    darkLogoData: { darkLogoData },
    sliderTitleData: { sliderTitleData },
    sliderImagesData: { sliderImagesData },
    contactsTitleData,
    contactsBigCardTitleData,
    officeHoursData: { officeHoursData },
    contactItemsData: { contactItemsData },
    generalMapData: { generalMapData },
    mapPinData: { mapPinData },
    mapMarkersData: { mapMarkersData },
    imagesTitleData,
    imageItemsData,
    socialFeedTitleData,
    socialFeedItemsData,
    quickLinksData: { quickLinksData },
    auxLinksData: { auxLinksData },
    socialLinksData: { socialLinksData },
    dgpStripeData,
    businessNameData: { businessNameData },
    beforeAfterTitleData,
    beforeAfterItemsData,
  } = useStaticQuery(query)

  const organizedMenuData = organizeMenu(categoriesData, cityStateData.Value)

  return (
    <>
      <LocationBanner
        phone={phoneData.Value}
        tel={telData.Value}
        address={addressData.Value}
        city={cityData.Value}
        state={stateData.Value}
        zip={zipCodeData.Value}
        auxLinks={auxLinksData}
        cityState={cityStateData.Value}
      />
      <Navbar
        menuData={organizedMenuData}
        logo={whiteLogoData.File.localFiles[0].publicURL}
        whiteLogoSize={
          whiteLogoSizeData
            ? whiteLogoSizeData.whiteLogoSizeData.Value
            : undefined
        }
        darkLogo={darkLogoData.File.localFiles[0].publicURL}
        phone={phoneData.Value}
        tel={telData.Value}
      />
      {children}
      <SliderSection
        superheading={sliderTitleData.Superheading}
        heading={sliderTitleData.Heading}
        subheading={sliderTitleData.Subheading}
        images={sliderImagesData}
      />
      <Map
        lat={generalMapData.Latitude}
        long={generalMapData.Longitude}
        zoom={generalMapData.zoomLevel}
        markers={mapMarkersData}
        pin={mapPinData.File.localFiles[0].publicURL}
        mapName="map"
      />
      {beforeAfterTitleData &&
        beforeAfterItemsData &&
        beforeAfterItemsData.beforeAfterItemsData &&
        beforeAfterItemsData.beforeAfterItemsData.length > 0 && (
          <BeforeAndAfter
            superheading={
              beforeAfterTitleData.beforeAfterTitleData.Superheading
            }
            heading={beforeAfterTitleData.beforeAfterTitleData.Heading}
            subheading={beforeAfterTitleData.beforeAfterTitleData.Subheading}
            backgroundOverride={
              beforeAfterTitleData.beforeAfterTitleData.BgColorOverride
            }
            images={beforeAfterItemsData.beforeAfterItemsData}
          />
        )}
      <ContactsSection
        superheading={contactsTitleData?.contactsTitleData.Superheading}
        heading={contactsTitleData?.contactsTitleData.Heading}
        bigCardHeading={
          contactsBigCardTitleData?.contactsBigCardTitleData.Superheading
        }
        bgImage={
          contactsTitleData?.contactsTitleData?.Media?.localFiles[0].publicURL
        }
        items={contactItemsData}
        officeHours={officeHoursData}
        phone={phoneData.Value}
        tel={telData.Value}
      />
      {imagesTitleData &&
        imagesTitleData.imagesTitleData &&
        imageItemsData &&
        imageItemsData.imageItemsData && (
          <ImagesSection
            superheading={imagesTitleData.imagesTitleData.Superheading}
            heading={imagesTitleData.imagesTitleData.Heading}
            subheading={imagesTitleData.imagesTitleData.Subheading}
            images={imageItemsData.imageItemsData}
          />
        )}

      {socialFeedTitleData &&
        socialFeedTitleData.socialFeedTitleData &&
        socialFeedItemsData &&
        socialFeedItemsData.socialFeedItemsData &&
        socialFeedItemsData.socialFeedItemsData.length > 0 && (
          <SocialFeed
            superheading={socialFeedTitleData.socialFeedTitleData.Superheading}
            heading={socialFeedTitleData.socialFeedTitleData.Heading}
            subheading={socialFeedTitleData.socialFeedTitleData.Subheading}
            images={socialFeedItemsData.socialFeedItemsData}
          />
        )}

      <Footer
        logo={whiteLogoData.File.localFiles[0].publicURL}
        whiteLogoSize={
          whiteLogoSizeData
            ? whiteLogoSizeData.whiteLogoSizeData.Value
            : undefined
        }
        addresses={allAddressedData}
        mainAddress={addressData.Value}
        city={cityData.Value}
        zip={zipCodeData.Value}
        state={stateData.Value}
        socialLinks={socialLinksData}
        businessName={businessNameData.Value}
        phoneNumber={phoneData.Value}
        tel={telData.Value}
        quickLinks={quickLinksData}
      />
      {dgpStripeData && dgpStripeData.dgpStripeData && (
        <DgpStripe
          text={dgpStripeData.dgpStripeData.Copy}
          link={dgpStripeData.dgpStripeData.ButtonLink}
          bgColorOverride={dgpStripeData.dgpStripeData.BgColorOverride}
        />
      )}

      <MobileNavbar
        menuData={organizedMenuData}
        logo={whiteLogoData.File.localFiles[0].publicURL}
        phone={phoneData.Value}
        tel={telData.Value}
      />
    </>
  )
}

const query = graphql`
  {
    categoriesData: allAirtable(
      filter: {
        table: { eq: "Menu" }
        data: { Parent: { nin: ["QuickMenu", "AuxLinks", ""] } }
      }
    ) {
      categoriesData: nodes {
        data {
          Parent
          Child
          Permalink
          rowNumber
        }
      }
    }
    whiteLogoData: airtable(
      table: { eq: "Config" }
      data: { Category: { eq: "Media" }, Label: { eq: "Logo Light" } }
    ) {
      whiteLogoData: data {
        File {
          localFiles {
            publicURL
          }
        }
      }
    }
    whiteLogoSizeData: airtable(
      table: { eq: "Config" }
      data: { Category: { eq: "Media" }, Label: { eq: "Logo Light" } }
    ) {
      whiteLogoSizeData: data {
        Value
      }
    }
    darkLogoData: airtable(
      table: { eq: "Config" }
      data: { Category: { eq: "Media" }, Label: { eq: "Logo Dark" } }
    ) {
      darkLogoData: data {
        File {
          localFiles {
            publicURL
          }
        }
      }
    }
    phoneData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Phone" } }
    ) {
      phoneData: data {
        Value
      }
    }
    telData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Tel:" } }
    ) {
      telData: data {
        Value
      }
    }
    sliderTitleData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Slider" } }
    ) {
      sliderTitleData: data {
        Superheading
        Heading
        Subheading
      }
    }
    sliderImagesData: allAirtable(
      filter: {
        table: { eq: "Footer (Global)" }
        data: { Block: { eq: "SliderItem" } }
      }
    ) {
      sliderImagesData: nodes {
        id
        data {
          Media {
            localFiles {
              publicURL
            }
          }
        }
      }
    }
    contactsTitleData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Contact" } }
    ) {
      contactsTitleData: data {
        Superheading
        Heading
        Media {
          localFiles {
            publicURL
          }
        }
        AltText
      }
    }
    contactsBigCardTitleData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "BigCardContactTitle" } }
    ) {
      contactsBigCardTitleData: data {
        Superheading
      }
    }
    contactItemsData: allAirtable(
      filter: {
        table: { eq: "Footer (Global)" }
        data: { Block: { eq: "ContactItem" }, isActive: { eq: true } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      contactItemsData: nodes {
        id
        data {
          Copy
          Heading
          ButtonLink
          ButtonLabel
        }
      }
    }
    officeHoursData: allAirtable(
      filter: { table: { eq: "Config" }, data: { Category: { eq: "Hours" } } }
      sort: { data: { rowNumber: ASC } }
    ) {
      officeHoursData: nodes {
        id
        data {
          Label
          Value
        }
      }
    }
    card1Data: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Card1" } }
    ) {
      card1Data: data {
        Heading
        Media {
          localFiles {
            publicURL
          }
        }
        AltText
      }
    }
    card3Data: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Card3" } }
    ) {
      card3Data: data {
        Heading
        Media {
          localFiles {
            publicURL
          }
        }
        AltText
      }
    }
    bigCardData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "BigCard" } }
    ) {
      bigCardData: data {
        Heading
        AltText
        ButtonLabel
        ButtonLink
        Media {
          localFiles {
            publicURL
          }
        }
      }
    }
    generalMapData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Map" } }
    ) {
      generalMapData: data {
        Latitude
        Longitude
        zoomLevel
      }
    }
    mapPinData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Map Pin" } }
    ) {
      mapPinData: data {
        File {
          localFiles {
            publicURL
          }
        }
      }
    }
    mapMarkersData: allAirtable(
      filter: {
        table: { eq: "Footer (Global)" }
        data: { Block: { eq: "MapMarker" } }
      }
    ) {
      mapMarkersData: nodes {
        data {
          Heading
          Latitude
          Longitude
        }
      }
    }

    imagesTitleData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Images" }, isActive: { eq: true } }
    ) {
      imagesTitleData: data {
        Heading
        Subheading
      }
    }
    imageItemsData: allAirtable(
      filter: {
        table: { eq: "Footer (Global)" }
        data: { Block: { eq: "ImagesItem" }, isActive: { eq: true } }
      }
    ) {
      imageItemsData: nodes {
        data {
          AltText
          Media {
            localFiles {
              publicURL
            }
          }
          ButtonLink
        }
        id
      }
    }
    socialFeedTitleData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "SocialFeed" }, isActive: { eq: true } }
    ) {
      socialFeedTitleData: data {
        Heading
        Subheading
        Superheading
      }
    }
    socialFeedItemsData: allAirtable(
      filter: {
        table: { eq: "Footer (Global)" }
        data: { Block: { eq: "SocialFeedItem" }, isActive: { eq: true } }
      }
    ) {
      socialFeedItemsData: nodes {
        data {
          AltText
          Media {
            localFiles {
              publicURL
            }
          }
          ButtonLink
        }
        id
      }
    }
    auxLinksData: allAirtable(
      filter: { table: { eq: "Menu" }, data: { Parent: { eq: "AuxLinks" } } }
    ) {
      auxLinksData: nodes {
        id
        data {
          Child
          Permalink
          rowNumber
        }
      }
    }
    quickLinksData: allAirtable(
      filter: { table: { eq: "Menu" }, data: { Parent: { eq: "QuickMenu" } } }
      sort: { data: { rowNumber: ASC } }
    ) {
      quickLinksData: nodes {
        id
        data {
          rowNumber
          Child
          Permalink
        }
      }
    }
    socialLinksData: allAirtable(
      filter: {
        table: { eq: "Config" }
        data: { Category: { eq: "Social Links" } }
      }
    ) {
      socialLinksData: nodes {
        data {
          Label
          Value
        }
      }
    }
    dgpStripeData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "SubFooter" }, isActive: { eq: true } }
    ) {
      dgpStripeData: data {
        Copy
        ButtonLink
        BgColorOverride
      }
    }
    businessNameData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Business Name" } }
    ) {
      businessNameData: data {
        Value
      }
    }
    addressData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Address" } }
    ) {
      addressData: data {
        Value
      }
    }
    cityData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "City" } }
    ) {
      cityData: data {
        Value
      }
    }
    stateData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "State" } }
    ) {
      stateData: data {
        Value
      }
    }
    zipCodeData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Zipcode" } }
    ) {
      zipCodeData: data {
        Value
      }
    }
    cityStateData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "City, St" } }
    ) {
      cityStateData: data {
        Value
      }
    }
    allAddressedData: allAirtable(
      filter: {
        table: { eq: "Config" }
        data: { Label: { eq: "Footer Alt Address" } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      allAddressedData: nodes {
        id
        data {
          Value
        }
      }
    }
    beforeAfterTitleData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "BeforeAfter" }, isActive: { eq: true } }
    ) {
      beforeAfterTitleData: data {
        Superheading
        Heading
        Subheading
        BgColorOverride
        rowNumber
      }
    }
    beforeAfterItemsData: allAirtable(
      filter: {
        table: { eq: "Footer (Global)" }
        data: { Block: { eq: "BeforeAfterItem" }, isActive: { eq: true } }
      }
    ) {
      beforeAfterItemsData: nodes {
        id
        data {
          AltText
          Heading
          Media {
            localFiles {
              publicURL
            }
          }
          rowNumber
        }
      }
    }
  }
`

export default Layout
