import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { v4 as uuidv4 } from "uuid"
import { findNextItem } from "../helpers/helpers"

import Seo from "../components/Seo"
import Layout from "../layout/Layout"

import Anchor from "../components/Anchor"
import Hero from "../components/Hero"

import PingPong from "../components/PingPong"
import CardsSection from "../components/CardsSection"
import TextSection from "../components/TextSection"
import CtaSection from "../components/CtaSection"
import Cta2 from "../components/Cta2"
import Faqs from "../components/Faqs"
import BeforeAndAfter from "../components/BeforeAndAfter"
import HtmlEmbed from "../components/HtmlEmbed"
import ImagesSection from "../components/ImagesSection"
import TestimonialsSlider from "../components/TestimonialsSlider"
import ButtonsStripe from "../components/ButtonsStripe"

const StyledInnerPageTemplate = styled.div``

const InnerPageTemplate = ({
  location,
  pageContext,
  data: {
    pageMetadata,
    pingPongTitleData,
    pingPongItemsData,
    pingPong2TitleData,
    pingPong2ItemsData,
    cardsTitleData,
    cardsData,
    cards2TitleData,
    cards2Data,
    imageTextData,
    imageText2Data,
    ctaData,
    cta2Data,
    heroData,
    anchorItemsData,
    textData,
    faqTitleData,
    faqItemsData,
    beforeAfterTitleData,
    beforeAfterItemsData,
    ctaButtonData,
    htmlData,
    imagesTitleData,
    imageItemsData,
    testimonialsTitleData,
    testimonialsData,
    ctaIconData: { ctaIconData },
    businessNameData: { businessNameData },
  },
}) => {
  const pageComponents = []

  if (
    heroData &&
    heroData.heroData &&
    heroData.heroData.Media &&
    heroData.heroData.Media.localFiles.length > 0
  )
    pageComponents.push({
      component: (
        <Hero
          key={uuidv4()}
          image={heroData.heroData.Media.localFiles[0].publicURL}
          mobileImage={heroData.heroData.Media.localFiles[1]?.publicURL}
          altText={heroData.heroData.AltText}
          superheading={heroData.heroData.Superheading}
          heading={heroData.heroData.Heading}
          subheading={heroData.heroData.Subheading}
          overlay={heroData.heroData.Overlay}
          isVideo={heroData.heroData.Media.raw[0].type.startsWith("video")}
          mimeType={heroData.heroData.Media.raw[0].type}
          textColorOverride={heroData.heroData.TextColorOverride}
        />
      ),
      index: heroData.heroData.rowNumber,
    })
  if (
    anchorItemsData &&
    anchorItemsData.anchorItemsData &&
    anchorItemsData.anchorItemsData.length > 0
  ) {
    pageComponents.push({
      component: (
        <Anchor key={uuidv4()} items={anchorItemsData.anchorItemsData} />
      ),
      index: anchorItemsData.anchorItemsData[0].rowNumber,
    })
  }
  if (
    pingPongTitleData &&
    pingPongTitleData.pingPongTitleData.length > 0 &&
    pingPongItemsData &&
    pingPongItemsData.pingPongItemsData &&
    pingPongItemsData.pingPongItemsData.length > 0
  ) {
    // Measure how long it takes to execute this code
    // console.time("pingPong")
    pingPongTitleData.pingPongTitleData.forEach((pingPongTitleData, i) => {
      // Filter out the items that belong to this ping pong.
      // The initial pingPongItem.data.rowNumber will be the rowNumber of the pingPongTitleData + 1,
      // keep adding to the array until the next pingPongItem.data.rowNumber is not consecutive to the previous one.
      const currentTitleRowNumber = pingPongTitleData.data.rowNumber
      const pingPongItemsFirstRow = pingPongItemsData.pingPongItemsData.find(
        item => item.data.rowNumber > currentTitleRowNumber,
      )

      if (!pingPongItemsFirstRow) return ""

      const pingPongItemsArray = []
      let currentRowNumber = pingPongItemsFirstRow.data.rowNumber

      pingPongItemsArray.push(pingPongItemsFirstRow)

      while (
        findNextItem(pingPongItemsData.pingPongItemsData, currentRowNumber)
      ) {
        pingPongItemsArray.push(
          findNextItem(pingPongItemsData.pingPongItemsData, currentRowNumber),
        )
        currentRowNumber++
      }

      pageComponents.push({
        component: (
          <PingPong
            key={pingPongTitleData.id}
            heading={pingPongTitleData.data.Heading}
            superheading={pingPongTitleData.data.Superheading}
            subheading={pingPongTitleData.data.Subheading}
            backgroundOverride={pingPongTitleData.data.BgColorOverride}
            items={pingPongItemsArray}
            sectionId={i === 0 ? "pingpong" : `pingpong-${i}`}
          />
        ),
        index: pingPongTitleData.data.rowNumber,
      })
    })
    // console.timeEnd("pingPong")
  }
  if (
    pingPong2TitleData &&
    pingPong2ItemsData &&
    pingPong2ItemsData.pingPong2ItemsData &&
    pingPong2ItemsData.pingPong2ItemsData.length > 0
  ) {
    pageComponents.push({
      component: (
        <PingPong
          key={uuidv4()}
          heading={pingPong2TitleData.pingPong2TitleData.Heading}
          superheading={pingPong2TitleData.pingPong2TitleData.Superheading}
          subheading={pingPong2TitleData.pingPong2TitleData.Subheading}
          backgroundOverride={
            pingPong2TitleData.pingPong2TitleData.BgColorOverride
          }
          items={pingPong2ItemsData.pingPong2ItemsData}
          sectionId={"pingpong2"}
        />
      ),
      index: pingPong2TitleData.pingPong2TitleData.rowNumber,
    })
  }
  if (cardsData && cardsTitleData)
    pageComponents.push({
      component: (
        <CardsSection
          key={cardsTitleData.id}
          superheading={cardsTitleData.cardsTitleData.Superheading}
          heading={cardsTitleData.cardsTitleData.Heading}
          subheading={cardsTitleData.cardsTitleData.Subheading}
          backgroundOverride={cardsTitleData.cardsTitleData.BgColorOverride}
          cards={cardsData.cardsData}
        />
      ),
      index: cardsTitleData.cardsTitleData.rowNumber,
    })
  if (cards2Data && cards2TitleData)
    pageComponents.push({
      component: (
        <CardsSection
          key={cards2TitleData.id}
          superheading={cards2TitleData.cards2TitleData.Superheading}
          heading={cards2TitleData.cards2TitleData.Heading}
          subheading={cards2TitleData.cards2TitleData.Subheading}
          cards={cards2Data.cards2Data}
          backgroundOverride={cards2TitleData.cards2TitleData.BgColorOverride}
          sectionId={"cards2"}
        />
      ),
      index: cards2TitleData.cards2TitleData.rowNumber,
    })
  if (
    imageTextData &&
    imageTextData.imageTextData &&
    imageTextData.imageTextData.length > 0
  ) {
    imageTextData.imageTextData.forEach((imageText, i) => {
      pageComponents.push({
        component: (
          <TextSection
            key={imageText.id}
            superheading={imageText.data.Superheading}
            heading={imageText.data.Heading}
            subheading={imageText.data.Subheading}
            copy={imageText.data.Copy}
            image={
              imageText &&
              imageText.data &&
              imageText.data.Media &&
              imageText.data.Media.localFiles.length > 0 &&
              imageText.data.Media.localFiles[0].publicURL
            }
            alternativeText={imageText.data.AltText}
            columns={1}
            backgroundOverride={imageText.data.BgColorOverride}
            sectionId={i === 0 ? "textimage" : `textimage-${i}`}
          />
        ),
        index: imageText.data.rowNumber,
      })
    })
  }
  if (imageText2Data)
    pageComponents.push({
      component: (
        <TextSection
          key={imageText2Data.id}
          superheading={imageText2Data.imageText2Data.Superheading}
          heading={imageText2Data.imageText2Data.Heading}
          subheading={imageText2Data.imageText2Data.Subheading}
          copy={imageText2Data.imageText2Data.Copy}
          image={imageText2Data.imageText2Data.Media.localFiles[0].publicURL}
          alternativeText={imageText2Data.imageText2Data.AltText}
          columns={1}
          backgroundOverride={imageText2Data.imageText2Data.BgColorOverride}
          sectionId={"textimage2"}
        />
      ),
      index: imageText2Data.imageText2Data.rowNumber,
    })
  if (textData && textData.textData && textData.textData.length > 0) {
    textData.textData.forEach((textData, i) => {
      const sectionId = i === 0 ? "text" : `text${i + 1}`
      pageComponents.push({
        component: (
          <TextSection
            key={textData.id}
            superheading={textData.data.Superheading}
            heading={textData.data.Heading}
            subheading={textData.data.Subheading}
            copy={textData.data.Copy}
            columns={1}
            backgroundOverride={textData.data.BgColorOverride}
            sectionId={sectionId}
          />
        ),
        index: textData.data.rowNumber,
      })
    })
  }
  if (ctaData)
    pageComponents.push({
      component: (
        <CtaSection
          key={ctaData.id}
          superheading={ctaData.ctaData.Superheading}
          heading={ctaData.ctaData.Heading}
          subheading={ctaData.ctaData.Subheading}
          copy={ctaData.ctaData.Copy}
          buttonLabel={ctaData.ctaData.ButtonLabel}
          buttonLink={ctaData.ctaData.ButtonLink}
          backgroundImage={ctaData?.ctaData?.Media?.localFiles[0]?.publicURL}
          overlay={ctaData.ctaData.Overlay}
          alternativeText={ctaData.ctaData.AltText}
          logo={ctaIconData.File.localFiles[0].publicURL}
          bgColorOverride={ctaData.ctaData.BgColorOverride}
          textColorOverride={ctaData.ctaData.TextColorOverride}
          logoAlt={`${businessNameData.Value} logo`}
          image={ctaData?.ctaData?.Media?.localFiles[0]?.publicURL}
        />
      ),
      index: ctaData.ctaData.rowNumber,
    })
  if (cta2Data)
    pageComponents.push({
      component: (
        <Cta2
          key={cta2Data.id}
          superheading={cta2Data.cta2Data.Superheading}
          heading={cta2Data.cta2Data.Heading}
          subheading={cta2Data.cta2Data.Subheading}
          copy={cta2Data.cta2Data.Copy}
          buttonLabel={cta2Data.cta2Data.ButtonLabel}
          buttonLink={cta2Data.cta2Data.ButtonLink}
          backgroundImage={cta2Data?.cta2Data?.Media?.localFiles[0]?.publicURL}
          overlay={cta2Data.cta2Data.Overlay}
          alternativeText={cta2Data.cta2Data.AltText}
          logo={cta2Data?.cta2Data?.Media?.localFiles[1]?.publicURL}
          bgColorOverride={cta2Data.cta2Data.BgColorOverride}
          logoAlt={`${businessNameData.Value} logo`}
          image={cta2Data?.cta2Data?.Media?.localFiles[0]?.publicURL}
        />
      ),
      index: cta2Data.cta2Data.rowNumber,
    })
  if (faqTitleData && faqItemsData)
    pageComponents.push({
      component: (
        <Faqs
          id="faq"
          superheading={faqTitleData.faqTitleData.Superheading}
          heading={faqTitleData.faqTitleData.Heading}
          subheading={faqTitleData.faqTitleData.Subheading}
          faqs={faqItemsData.faqItemsData}
          backgroundOverride={faqTitleData.faqTitleData.BgColorOverride}
          key={faqTitleData.id}
        />
      ),
      index: faqTitleData.faqTitleData.rowNumber,
    })
  if (
    beforeAfterTitleData &&
    beforeAfterItemsData &&
    beforeAfterItemsData.beforeAfterItemsData &&
    beforeAfterItemsData.beforeAfterItemsData.length > 0
  ) {
    pageComponents.push({
      component: (
        <BeforeAndAfter
          key={uuidv4()}
          superheading={beforeAfterTitleData.beforeAfterTitleData.Superheading}
          heading={beforeAfterTitleData.beforeAfterTitleData.Heading}
          subheading={beforeAfterTitleData.beforeAfterTitleData.Subheading}
          backgroundOverride={
            beforeAfterTitleData.beforeAfterTitleData.BgColorOverride
          }
          images={beforeAfterItemsData.beforeAfterItemsData}
        />
      ),
      index: beforeAfterTitleData.beforeAfterTitleData.rowNumber,
    })
  }
  if (htmlData && htmlData.htmlData && htmlData.htmlData.length > 0) {
    htmlData.htmlData.forEach((htmlData, i) => {
      const sectionId = i === 0 ? "html" : `html${i}`
      pageComponents.push({
        component: (
          <HtmlEmbed
            html={htmlData.data.Copy}
            superheading={htmlData.data.Superheading}
            heading={htmlData.data.Heading}
            subheading={htmlData.data.Subheading}
            key={htmlData.id}
            id={sectionId}
            bgColorOverride={htmlData.data.BgColorOverride}
          />
        ),
        index: htmlData.data.rowNumber,
      })
    })
  }
  if (ctaButtonData) {
    pageComponents.push({
      component: (
        <ButtonsStripe
          buttonLabel={ctaButtonData.ctaButtonData.ButtonLabel}
          buttonLink={ctaButtonData.ctaButtonData.ButtonLink}
          superheading={ctaButtonData.ctaButtonData.Superheading}
          heading={ctaButtonData.ctaButtonData.Heading}
          subheading={ctaButtonData.ctaButtonData.Subheading}
          backgroundOverride={ctaButtonData.ctaButtonData.BgColorOverride}
          textColorOverride={ctaButtonData.ctaButtonData.TextColorOverride}
          key={uuidv4()}
          offer={pageContext.offer}
        />
      ),
      index: ctaButtonData.ctaButtonData.rowNumber,
    })
  }
  if (
    imagesTitleData &&
    imageItemsData &&
    imageItemsData.imageItemsData &&
    imageItemsData.imageItemsData.length > 0
  ) {
    pageComponents.push({
      component: (
        <ImagesSection
          superheading={imagesTitleData.imagesTitleData.Superheading}
          heading={imagesTitleData.imagesTitleData.Heading}
          subheading={imagesTitleData.imagesTitleData.Subheading}
          images={imageItemsData.imageItemsData}
          key={uuidv4()}
        />
      ),
      index: imagesTitleData.imagesTitleData.rowNumber,
    })
  }
  if (
    testimonialsTitleData &&
    testimonialsData &&
    testimonialsData.testimonialsData &&
    testimonialsData.testimonialsData.length > 0
  ) {
    pageComponents.push({
      component: (
        <TestimonialsSlider
          superheading={
            testimonialsTitleData.testimonialsTitleData.Superheading
          }
          heading="Hear what our customers have to say"
          subheading={testimonialsTitleData.testimonialsTitleData.Subheading}
          testimonials={testimonialsData.testimonialsData}
          key={uuidv4()}
        />
      ),
      index: testimonialsTitleData.testimonialsTitleData.rowNumber,
    })
  }

  // console.log(pageComponents)

  // Sort array by inner objects index property
  const sortedPageComponents = pageComponents.sort((a, b) => a.index - b.index)
  // console.log({ sortedPageComponents })

  return (
    <Layout>
      <Seo
        title={`${businessNameData.Value} | ${pageMetadata?.pageMetadata.SEOTitle}`}
        description={pageMetadata?.pageMetadata.Description}
        mainKeyword={pageMetadata?.pageMetadata.Main_Keyword}
        relativeKeywords={pageMetadata?.pageMetadata.Relative_Keywords}
        pathname={location.pathname}
      />
      <StyledInnerPageTemplate>
        {sortedPageComponents.map(({ component }) => component)}
      </StyledInnerPageTemplate>
    </Layout>
  )
}

export const query = graphql`
  query ($permalink: String!, $pageTitle: String!) {
    pageMetadata: airtable(
      table: { eq: "Sitemap" }
      data: { Permalink: { eq: $permalink } }
    ) {
      pageMetadata: data {
        SEOTitle
        Main_Keyword
        Relative_Keywords
        Description
      }
    }
    heroData: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "Hero" }, isActive: { eq: true } }
    ) {
      heroData: data {
        AltText
        TextColorOverride
        Media {
          raw {
            type
          }
          localFiles {
            publicURL
          }
        }
        Superheading
        Heading
        Subheading
        Overlay
        rowNumber
      }
      id
    }

    anchorItemsData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { isActive: { eq: true }, Block: { eq: "AnchorItem" } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      anchorItemsData: nodes {
        id
        data {
          ButtonLabel
          ButtonTarget
          rowNumber
        }
      }
    }
    pingPongTitleData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { isActive: { eq: true }, Block: { eq: "PingPong" } }
      }
    ) {
      pingPongTitleData: nodes {
        id
        data {
          Superheading
          Heading
          Subheading
          BgColorOverride
          rowNumber
        }
      }
    }
    pingPongItemsData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { Block: { eq: "PingPongItem" }, isActive: { eq: true } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      pingPongItemsData: nodes {
        data {
          rowNumber
          AltText
          Heading
          Copy
          ButtonLabel
          ButtonLink
          Media {
            localFiles {
              publicURL
            }
          }
        }
        id
      }
    }
    pingPong2TitleData: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "PingPong2" }, isActive: { eq: true } }
    ) {
      pingPong2TitleData: data {
        Superheading
        Heading
        Subheading
        BgColorOverride
        rowNumber
      }
      id
    }
    pingPong2ItemsData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { Block: { eq: "PingPong2Item" }, isActive: { eq: true } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      pingPong2ItemsData: nodes {
        data {
          AltText
          Heading
          Copy
          Media {
            localFiles {
              publicURL
            }
          }
        }
        id
      }
    }
    cardsTitleData: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "Cards" }, isActive: { eq: true } }
    ) {
      cardsTitleData: data {
        Superheading
        Heading
        Subheading
        BgColorOverride
        rowNumber
      }
      id
    }
    cardsData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { Block: { eq: "CardsItem" }, isActive: { eq: true } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      cardsData: nodes {
        data {
          Heading
          Subheading
          Copy
          ButtonLabel
          ButtonLink
          Media {
            localFiles {
              publicURL
            }
          }
          AltText
        }
        id
      }
    }
    cards2TitleData: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "Cards2" }, isActive: { eq: true } }
    ) {
      cards2TitleData: data {
        BgColorOverride
        Superheading
        Heading
        Subheading
        rowNumber
      }
      id
    }
    cards2Data: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { Block: { eq: "Cards2Item" }, isActive: { eq: true } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      cards2Data: nodes {
        data {
          Heading
          Subheading
          Copy
          ButtonLabel
          ButtonLink
          Media {
            localFiles {
              publicURL
            }
          }
          AltText
        }
        id
      }
    }
    imageTextData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { Block: { eq: "TextImage" }, isActive: { eq: true } }
      }
    ) {
      imageTextData: nodes {
        data {
          Superheading
          Heading
          Subheading
          Copy
          BgColorOverride
          Media {
            localFiles {
              publicURL
            }
          }
          AltText
          rowNumber
        }
        id
      }
    }
    imageText2Data: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "TextImage2" }, isActive: { eq: true } }
    ) {
      imageText2Data: data {
        Superheading
        Heading
        Subheading
        Copy
        BgColorOverride
        Media {
          localFiles {
            publicURL
          }
        }
        AltText
        rowNumber
      }
      id
    }
    textData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { Block: { eq: "Text" }, isActive: { eq: true } }
      }
      sort: { data: { rowNumber: ASC } }
    ) {
      textData: nodes {
        data {
          Superheading
          Heading
          Subheading
          Copy
          BgColorOverride
          rowNumber
        }
        id
      }
    }
    ctaData: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "CTA" }, isActive: { eq: true } }
    ) {
      ctaData: data {
        Heading
        Subheading
        Copy
        ButtonLabel
        ButtonLink
        AltText
        Overlay
        rowNumber
        BgColorOverride
        TextColorOverride
        Media {
          localFiles {
            publicURL
          }
        }
      }
      id
    }
    cta2Data: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "CTA2" }, isActive: { eq: true } }
    ) {
      cta2Data: data {
        Heading
        Subheading
        Superheading
        Copy
        ButtonLink
        ButtonLabel
        AltText
        Overlay
        rowNumber
        BgColorOverride
        Media {
          localFiles {
            publicURL
          }
        }
      }
      id
    }
    faqTitleData: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "FAQ" }, isActive: { eq: true } }
    ) {
      faqTitleData: data {
        Superheading
        Heading
        Subheading
        BgColorOverride
        rowNumber
      }
      id
    }
    faqItemsData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { Block: { eq: "FaqItem" }, isActive: { eq: true } }
      }
    ) {
      faqItemsData: nodes {
        data {
          Heading
          Copy
        }
        id
      }
    }
    beforeAfterTitleData: airtable(
      table: { eq: $pageTitle }
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
        table: { eq: $pageTitle }
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
    ctaButtonData: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "CTAButton" }, isActive: { eq: true } }
    ) {
      ctaButtonData: data {
        Superheading
        Heading
        Subheading
        ButtonLink
        ButtonLabel
        rowNumber
        BgColorOverride
        TextColorOverride
      }
      id
    }
    ctaIconData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "ctaIcon" } }
    ) {
      ctaIconData: data {
        File {
          localFiles {
            publicURL
          }
        }
      }
    }
    htmlData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { Block: { eq: "HTML" }, isActive: { eq: true } }
      }
    ) {
      htmlData: nodes {
        data {
          Superheading
          Subheading
          Heading
          Copy
          rowNumber
          BgColorOverride
        }
        id
      }
    }
    imagesTitleData: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "Images" }, isActive: { eq: true } }
    ) {
      imagesTitleData: data {
        rowNumber
        Heading
        Subheading
      }
    }
    imageItemsData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
        data: { Block: { eq: "ImagesItem" }, isActive: { eq: true } }
      }
    ) {
      imageItemsData: nodes {
        data {
          rowNumber
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
    testimonialsTitleData: airtable(
      table: { eq: $pageTitle }
      data: { Block: { eq: "Testimonials" }, isActive: { eq: true } }
    ) {
      testimonialsTitleData: data {
        rowNumber
        Superheading
        Heading
        Subheading
      }
    }
    testimonialsData: allAirtable(
      filter: {
        table: { eq: $pageTitle }
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
    businessNameData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Business Name" } }
    ) {
      businessNameData: data {
        Value
      }
    }
  }
`

export default InnerPageTemplate
