import { gql } from '@apollo/client'

export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription { processed }
        statsItems {
          ... on ParagraphStatItem { id number label }
        }
        featuredGalleriesTitle
        ctaTitle
        ctaDescription { processed }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

export const GET_GALLERIES = gql`
  query GetGalleries($first: Int = 20) {
    nodeGalleries(first: $first, sortKey: CREATED_AT) {
      nodes {
        id title path
        ... on NodeGallery {
          body { processed summary }
          photographyStyle { ... on TermInterface { id name } }
          shootDate { timestamp }
          location
          image { url alt width height variations(styles: [LARGE, MEDIUM]) { name url width height } }
          imageCount
        }
      }
    }
  }
`

export const GET_GALLERY_BY_PATH = gql`
  query GetGalleryByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeGallery {
            id title path
            body { processed }
            photographyStyle { ... on TermInterface { id name } }
            shootDate { timestamp }
            location
            image { url alt width height variations(styles: [LARGE, MEDIUM]) { name url width height } }
            imageCount
          }
        }
      }
    }
  }
`

export const GET_SERVICES = gql`
  query GetServices($first: Int = 20) {
    nodeServices(first: $first, sortKey: TITLE) {
      nodes {
        id title path
        ... on NodeService {
          body { processed summary }
          serviceType { ... on TermInterface { id name } }
          startingPrice
          duration
          image { url alt width height variations(styles: [LARGE, MEDIUM]) { name url width height } }
        }
      }
    }
  }
`

export const GET_SERVICE_BY_PATH = gql`
  query GetServiceByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeService {
            id title path
            body { processed }
            serviceType { ... on TermInterface { id name } }
            startingPrice
            duration
            image { url alt width height variations(styles: [LARGE, MEDIUM]) { name url width height } }
          }
        }
      }
    }
  }
`

export const GET_TESTIMONIALS = gql`
  query GetTestimonials($first: Int = 20) {
    nodeTestimonials(first: $first, sortKey: CREATED_AT) {
      nodes {
        id title path
        ... on NodeTestimonial {
          body { processed }
          clientName
          serviceTypeName
          photo { url alt width height }
          rating
        }
      }
    }
  }
`

export const GET_FEATURED_GALLERIES = gql`
  query GetFeaturedGalleries {
    nodeGalleries(first: 3, sortKey: CREATED_AT) {
      nodes {
        id title path
        ... on NodeGallery {
          photographyStyle { ... on TermInterface { id name } }
          location
          image { url alt variations(styles: [MEDIUM]) { name url width height } }
          imageCount
        }
      }
    }
  }
`

export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage { id title body { processed } }
          ... on NodeGallery {
            id title path
            body { processed }
            photographyStyle { ... on TermInterface { id name } }
            shootDate { timestamp }
            location
            image { url alt width height }
            imageCount
          }
          ... on NodeService {
            id title path
            body { processed }
            serviceType { ... on TermInterface { id name } }
            startingPrice
            duration
            image { url alt width height }
          }
          ... on NodeTestimonial {
            id title path
            body { processed }
            clientName
            serviceTypeName
            photo { url alt }
            rating
          }
          ... on NodeHomepage {
            id title
            heroTitle heroSubtitle
            heroDescription { processed }
            statsItems { ... on ParagraphStatItem { id number label } }
            featuredGalleriesTitle
            ctaTitle ctaDescription { processed }
            ctaPrimary ctaSecondary
          }
        }
      }
    }
  }
`
