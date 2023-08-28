import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { buildLink } from "../helpers/helpers"

// Error checking ignored on .jsx files being imported due to time constraints.
// @ts-expect-error
import Navbar from "./Navbar"
// @ts-expect-error
import MobileNavbar from "./MobileNavbar/MobileNavbar"
// @ts-expect-error
import Footer from "./Footer"

// @ts-expect-error
import SliderSection from "../components/SliderSection"
import ContactsSection, {
  ContactItem,
  OfficeHoursItem,
} from "../components/ContactsSection"

// @ts-expect-error
import Map from "../components/Map"

// @ts-expect-error
import DgpStripe from "../components/DgpStripe"
import BeforeAndAfter, {
  IBeforeAndAfterImage,
} from "../components/BeforeAndAfter"

// @ts-expect-error
import ImagesSection from "../components/ImagesSection"

// @ts-expect-error
import SocialFeed from "../components/SocialFeed"

// @ts-expect-error
import LocationBanner from "./LocationBanner"

// @ts-expect-error
import TestimonialsSlider from "../components/TestimonialsSlider"

// TODO: Add types for the organize menu function
function organizeMenu(categoriesData: any, cityState: any) {
  const categories = new Set<string>()
  const organizedMenuData: any = {}

  const sortedCategoriesData = categoriesData.sort((a: any, b: any) => {
    return a.data.rowNumber - b.data.rowNumber
  })

  sortedCategoriesData.forEach((category: any) => {
    //if (category.data.Parent === "Home") return
    if (category.data.Parent && category.data.Permalink)
      categories.add(category.data.Parent)
  })

  // // Inspect categories and console log each item
  // categories.forEach(category => {
  //   console.log({ category })
  // })

  categories.forEach((category: any) => {
    organizedMenuData[category] = []
  })

  sortedCategoriesData.forEach((navItem: any) => {
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
    (item: any) => item,
  )

  return { categories: [...categories], menuData: noLogoCategoriesData }
}

const Layout = ({ children }: React.PropsWithChildren) => {
  const {
    whiteLogoData,
    whiteLogoSizeData,
    addressData,
    allAddressedData: { allAddressedData },
    cityData,
    stateData,
    cityStateData,
    zipCodeData,
    categoriesData: { categoriesData },
    phoneData,
    telData,
    darkLogoData,
    appointmentButtonLabelData,
    appointmentButtonUrlData,
    dentalOfferButtonLabelData,
    dentalOfferButtonUrlData,
    sliderTitleData,
    sliderImagesData,
    contactsTitleData,
    card1Data,
    bigCardData,
    card3Data,
    officeHoursData: { officeHoursData },
    contactItemsData,
    generalMapData,
    mapPinData,
    mapMarkersData,
    imagesTitleData,
    imageItemsData,
    socialFeedTitleData,
    socialFeedItemsData,
    quickLinksData: { quickLinksData },
    auxLinksData: { auxLinksData },
    socialLinksData: { socialLinksData },
    dgpStripeData,
    businessNameData,
    beforeAfterTitleData,
    beforeAfterItemsData,
    testimonialsTitleData,
    testimonialsData,
  }: Queries.LayoutQueryQuery = useStaticQuery(query)

  const whiteLogo =
    (whiteLogoData?.whiteLogoData?.File?.localFiles &&
      whiteLogoData.whiteLogoData.File.localFiles.at(0)?.publicURL) ||
    undefined
  const darkLogo =
    (darkLogoData?.darkLogoData?.File?.localFiles &&
      darkLogoData.darkLogoData.File.localFiles[0]?.publicURL) ||
    undefined
  const mapPin =
    mapPinData?.mapPinData?.File?.localFiles?.at(0)?.publicURL || undefined

  const cityStateValue = cityStateData?.cityStateData?.Value || ""
  const phoneValue = phoneData?.phoneData?.Value || ""
  const telDataValue = telData?.telData?.Value || ""
  const businessName = businessNameData?.businessNameData?.Value || ""

  const organizedMenuData = organizeMenu(categoriesData, cityStateValue)

  const globalFooterItems: {
    component: JSX.Element
    index: number
  }[] = []

  const appointmentButtonUrl =
    (appointmentButtonUrlData &&
      appointmentButtonUrlData.appointmentButtonUrlData &&
      appointmentButtonUrlData.appointmentButtonUrlData.Value) ||
    "/contact-us"
  const appointmentButtonLabel =
    (appointmentButtonLabelData &&
      appointmentButtonLabelData.appointmentButtonLabelData &&
      appointmentButtonLabelData.appointmentButtonLabelData.Value) ||
    "APPOINTMENTS"
  const dentalOfferButtonUrl =
    (dentalOfferButtonUrlData &&
      dentalOfferButtonUrlData.dentalOfferButtonUrlData &&
      dentalOfferButtonUrlData.dentalOfferButtonUrlData.Value) ||
    "/dental-offer"
  const dentalOfferButtonLabel =
    (dentalOfferButtonLabelData &&
      dentalOfferButtonLabelData.dentalOfferButtonLabelData &&
      dentalOfferButtonLabelData.dentalOfferButtonLabelData.Value) ||
    "DENTAL OFFER"

  if (
    sliderTitleData &&
    sliderTitleData.sliderTitleData &&
    sliderImagesData &&
    sliderImagesData.sliderImagesData &&
    sliderImagesData.sliderImagesData.length > 0 &&
    sliderTitleData.sliderTitleData.rowNumber
  ) {
    globalFooterItems.push({
      component: (
        <SliderSection
          superheading={sliderTitleData.sliderTitleData.Superheading}
          heading={sliderTitleData.sliderTitleData.Heading}
          subheading={sliderTitleData.sliderTitleData.Subheading}
          images={sliderImagesData.sliderImagesData}
          key={sliderTitleData.id}
        />
      ),
      index: sliderTitleData.sliderTitleData.rowNumber,
    })
  }

  if (
    generalMapData &&
    generalMapData.generalMapData &&
    generalMapData.generalMapData.Latitude &&
    generalMapData.generalMapData.Longitude &&
    generalMapData.generalMapData.zoomLevel &&
    mapMarkersData &&
    mapMarkersData.mapMarkersData &&
    mapMarkersData.mapMarkersData.length > 0 &&
    generalMapData.generalMapData.rowNumber
  ) {
    globalFooterItems.push({
      component: (
        <Map
          lat={generalMapData.generalMapData.Latitude}
          long={generalMapData.generalMapData.Longitude}
          zoom={generalMapData.generalMapData.zoomLevel}
          markers={mapMarkersData.mapMarkersData}
          pin={mapPin}
          mapName="map"
          key={generalMapData.id}
          sectionId="map"
        />
      ),
      index: generalMapData.generalMapData.rowNumber,
    })
  }

  if (
    contactsTitleData &&
    contactsTitleData.contactsTitleData &&
    contactItemsData &&
    contactItemsData.contactItemsData &&
    contactItemsData.contactItemsData.length > 0 &&
    card1Data &&
    card1Data.card1Data &&
    card1Data.card1Data.Heading &&
    bigCardData &&
    bigCardData.bigCardData &&
    contactsTitleData.contactsTitleData.rowNumber
  )
    globalFooterItems.push({
      component: (
        <ContactsSection
          bgColorOverride={
            contactsTitleData.contactsTitleData.BgColorOverride || undefined
          }
          bgImage={
            (contactsTitleData &&
              contactsTitleData.contactsTitleData &&
              contactsTitleData.contactsTitleData.Media &&
              contactsTitleData.contactsTitleData.Media.localFiles &&
              contactsTitleData.contactsTitleData.Media.localFiles[0]
                ?.publicURL) ||
            undefined
          }
          textColorOverride={
            contactsTitleData?.contactsTitleData?.TextColorOverride || undefined
          }
          card1Data={{
            heading: card1Data.card1Data.Heading,
            bgColorOverride: card1Data.card1Data.BgColorOverride || undefined,
            textColorOverride:
              card1Data.card1Data.TextColorOverride || undefined,
          }}
          bigCardData={{
            heading: bigCardData.bigCardData.Heading || undefined,
            bgColorOverride:
              bigCardData.bigCardData.BgColorOverride || undefined,
            textColorOverride:
              bigCardData.bigCardData.TextColorOverride || undefined,
            buttonLabel: bigCardData.bigCardData.ButtonLabel || undefined,
            buttonLink: bigCardData.bigCardData.ButtonLink || undefined,
          }}
          card3Data={{
            bgColorOverride: card3Data?.card3Data?.BgColorOverride || undefined,
            textColorOverride:
              card3Data?.card3Data?.TextColorOverride || undefined,
          }}
          items={contactItemsData.contactItemsData.slice() as ContactItem[]}
          officeHours={officeHoursData.slice() as OfficeHoursItem[]}
          phone={phoneValue}
          tel={telDataValue}
          key={contactsTitleData.id}
        />
      ),
      index: contactsTitleData.contactsTitleData.rowNumber,
    })

  if (
    beforeAfterTitleData &&
    beforeAfterTitleData.beforeAfterTitleData &&
    beforeAfterItemsData &&
    beforeAfterItemsData.beforeAfterItemsData &&
    beforeAfterItemsData.beforeAfterItemsData.length > 0 &&
    beforeAfterTitleData.beforeAfterTitleData.rowNumber
  ) {
    globalFooterItems.push({
      component: (
        <BeforeAndAfter
          superheading={
            beforeAfterTitleData.beforeAfterTitleData.Superheading || undefined
          }
          heading={
            beforeAfterTitleData.beforeAfterTitleData.Heading || undefined
          }
          subheading={
            beforeAfterTitleData.beforeAfterTitleData.Subheading || undefined
          }
          backgroundOverride={
            beforeAfterTitleData.beforeAfterTitleData.BgColorOverride ||
            undefined
          }
          images={
            beforeAfterItemsData.beforeAfterItemsData.slice() as IBeforeAndAfterImage[]
          }
          key={beforeAfterTitleData.id}
        />
      ),
      index: beforeAfterTitleData.beforeAfterTitleData.rowNumber,
    })
  }

  if (
    imagesTitleData &&
    imagesTitleData.imagesTitleData &&
    imageItemsData &&
    imageItemsData.imageItemsData &&
    imagesTitleData.imagesTitleData.rowNumber
  ) {
    globalFooterItems.push({
      component: (
        <ImagesSection
          // @ts-ignore
          superheading={imagesTitleData.imagesTitleData.Superheading}
          heading={imagesTitleData.imagesTitleData.Heading}
          subheading={imagesTitleData.imagesTitleData.Subheading}
          images={imageItemsData.imageItemsData}
          key={imagesTitleData.id}
        />
      ),
      index: imagesTitleData.imagesTitleData.rowNumber,
    })
  }

  if (
    socialFeedTitleData &&
    socialFeedTitleData.socialFeedTitleData &&
    socialFeedItemsData &&
    socialFeedItemsData.socialFeedItemsData &&
    socialFeedItemsData.socialFeedItemsData.length > 0 &&
    socialFeedTitleData.socialFeedTitleData.rowNumber
  ) {
    globalFooterItems.push({
      component: (
        <SocialFeed
          superheading={socialFeedTitleData.socialFeedTitleData.Superheading}
          heading={socialFeedTitleData.socialFeedTitleData.Heading}
          subheading={socialFeedTitleData.socialFeedTitleData.Subheading}
          images={socialFeedItemsData.socialFeedItemsData}
          key={socialFeedTitleData.id}
        />
      ),
      index: socialFeedTitleData.socialFeedTitleData.rowNumber,
    })
  }

  if (
    testimonialsTitleData &&
    testimonialsTitleData.testimonialsTitleData &&
    testimonialsData &&
    testimonialsData.testimonialsData &&
    testimonialsData.testimonialsData.length > 0 &&
    testimonialsTitleData.testimonialsTitleData.rowNumber
  ) {
    globalFooterItems.push({
      component: (
        <TestimonialsSlider
          superheading={
            testimonialsTitleData.testimonialsTitleData.Superheading
          }
          heading="Hear what our customers have to say"
          subheading={testimonialsTitleData.testimonialsTitleData.Subheading}
          testimonials={testimonialsData.testimonialsData}
          bgColorOverride={
            testimonialsTitleData.testimonialsTitleData.BgColorOverride
          }
          key={testimonialsTitleData.id}
        />
      ),
      index: testimonialsTitleData.testimonialsTitleData.rowNumber,
    })
  }

  const sortedFooterItems = globalFooterItems.sort((a, b) => {
    return a.index - b.index
  })

  return (
    <>
      <LocationBanner
        phone={phoneValue}
        tel={telDataValue}
        address={
          (addressData &&
            addressData.addressData &&
            addressData.addressData.Value) ||
          ""
        }
        city={(cityData && cityData.cityData && cityData.cityData.Value) || ""}
        state={
          (stateData && stateData.stateData && stateData.stateData.Value) || ""
        }
        zip={
          (zipCodeData &&
            zipCodeData.zipCodeData &&
            zipCodeData.zipCodeData.Value) ||
          ""
        }
        auxLinks={auxLinksData}
        cityState={cityStateValue}
      />
      <Navbar
        menuData={organizedMenuData}
        logo={whiteLogo}
        appointmentButtonUrl={appointmentButtonUrl}
        appointmentButtonLabel={appointmentButtonLabel}
        dentalOfferButtonUrl={dentalOfferButtonUrl}
        dentalOfferButtonLabel={dentalOfferButtonLabel}
        whiteLogoSize={
          (whiteLogoSizeData &&
            whiteLogoSizeData.whiteLogoSizeData &&
            whiteLogoSizeData.whiteLogoSizeData.Value) ||
          undefined
        }
        darkLogo={darkLogo}
        phone={phoneValue}
        tel={telDataValue}
      />
      {children}
      {sortedFooterItems.map(component => component.component)}

      <Footer
        logo={whiteLogo}
        whiteLogoSize={
          (whiteLogoSizeData &&
            whiteLogoSizeData.whiteLogoSizeData &&
            whiteLogoSizeData.whiteLogoSizeData.Value) ||
          undefined
        }
        addresses={allAddressedData}
        mainAddress={
          (addressData &&
            addressData.addressData &&
            addressData.addressData.Value) ||
          ""
        }
        city={(cityData && cityData.cityData && cityData.cityData.Value) || ""}
        zip={
          (zipCodeData &&
            zipCodeData.zipCodeData &&
            zipCodeData.zipCodeData.Value) ||
          ""
        }
        state={
          (stateData && stateData.stateData && stateData.stateData.Value) || ""
        }
        socialLinks={socialLinksData}
        businessName={businessName}
        phoneNumber={phoneValue}
        tel={telDataValue}
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
        logo={whiteLogo}
        phone={phoneValue}
        tel={telDataValue}
        appointmentButtonUrl={appointmentButtonUrl}
        appointmentButtonLabel={appointmentButtonLabel}
        dentalOfferButtonUrl={dentalOfferButtonUrl}
        dentalOfferButtonLabel={dentalOfferButtonLabel}
      />
    </>
  )
}

const query = graphql`
  query LayoutQuery {
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
      id
      sliderTitleData: data {
        Superheading
        Heading
        Subheading
        rowNumber
      }
    }
    sliderImagesData: allAirtable(
      filter: {
        table: { eq: "Footer (Global)" }
        data: { Block: { eq: "SliderItem" }, isActive: { eq: true } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      sliderImagesData: nodes {
        id
        data {
          Media {
            localFiles {
              childImageSharp {
                gatsbyImageData
              }
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
      id
      contactsTitleData: data {
        Superheading
        BgColorOverride
        TextColorOverride
        Heading
        Media {
          localFiles {
            publicURL
          }
        }
        AltText
        rowNumber
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
        BgColorOverride
        TextColorOverride
      }
    }
    card3Data: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Card3" } }
    ) {
      card3Data: data {
        BgColorOverride
        TextColorOverride
      }
    }
    bigCardData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "BigCard" } }
    ) {
      bigCardData: data {
        Heading
        BgColorOverride
        TextColorOverride
        ButtonLabel
        ButtonLink
      }
    }
    testimonialsTitleData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Testimonials" }, isActive: { eq: true } }
    ) {
      id
      testimonialsTitleData: data {
        rowNumber
        Superheading
        Heading
        Subheading
        BgColorOverride
      }
    }
    testimonialsData: allAirtable(
      filter: {
        table: { eq: "Footer (Global)" }
        data: { Block: { eq: "TestimonialsItem" }, isActive: { eq: true } }
      }
    ) {
      testimonialsData: nodes {
        id
        data {
          rowNumber
          Heading
          Subheading
          Copy
          Media {
            localFiles {
              publicURL
            }
          }
        }
      }
    }
    generalMapData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Map" } }
    ) {
      id
      generalMapData: data {
        Latitude
        Longitude
        zoomLevel
        rowNumber
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
      id
      imagesTitleData: data {
        Superheading
        Heading
        Subheading
        rowNumber
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
      id
      socialFeedTitleData: data {
        rowNumber
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
      id
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
    appointmentButtonLabelData: airtable(
      table: { eq: "Config" }
      data: {
        Category: { eq: "Floating Buttons" }
        Label: { eq: "appointmentButtonLabel" }
      }
    ) {
      appointmentButtonLabelData: data {
        Value
      }
    }
    appointmentButtonUrlData: airtable(
      table: { eq: "Config" }
      data: {
        Category: { eq: "Floating Buttons" }
        Label: { eq: "appointmentButtonUrl" }
      }
    ) {
      appointmentButtonUrlData: data {
        Value
      }
    }
    dentalOfferButtonLabelData: airtable(
      table: { eq: "Config" }
      data: {
        Category: { eq: "Floating Buttons" }
        Label: { eq: "dentalOfferButtonLabel" }
      }
    ) {
      dentalOfferButtonLabelData: data {
        Value
      }
    }
    dentalOfferButtonUrlData: airtable(
      table: { eq: "Config" }
      data: {
        Category: { eq: "Floating Buttons" }
        Label: { eq: "dentalOfferButtonUrl" }
      }
    ) {
      dentalOfferButtonUrlData: data {
        Value
      }
    }
  }
`

export default Layout
