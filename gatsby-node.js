/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const getArticles = makeRequest(
    graphql,
    `
    {
      site{
        siteMetadata {
          title
        }
      }
    }
    `
  )
    .then(result => {
      createPage({
        path: `/article/url(testing)`,
        component: path.resolve(`src/template/template.js`),
      })
    })
    .catch(err => console.log('ERROR CREATING PAGES: ', err))

  return Promise.all([getArticles])
}
