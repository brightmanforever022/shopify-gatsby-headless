import React, { useState } from 'react' /* eslint-disable */
import { graphql } from "gatsby"
import ProductBox from "../components/ProductList/productBox"
import './collectionPage.scss';

const collectionPage = ({ data, pageContext }) => {
  const { productReviews } = pageContext;
  const [ displayProductCount, setDisplayProductCount ] = useState(2);

  const collectionShowMore = (e) => {
    e.preventDefault();
    console.log('submit arrive');
  }

  const collectionShowLess = (e) => {
    e.preventDefault();
    console.log('submit arrive');
  }

  const loadMoreProducts = (e) => {
    e.preventDefault();
    console.log('Load More');
    setDisplayProductCount(displayProductCount + 2);
  }

  function setHoverEffectsForCollection() {

    const allFirstImageElements = document.querySelectorAll(".disableSaveImageIOS");
    for (let i = 0; i < allFirstImageElements.length; i++) {
  
      $(allFirstImageElements[i]).on('touchstart', function () {  
        $(this).toggleClass('hover_effect');
      });
  
    }
  }

  let xDownVariant;
  let yDownVariant;

  function attachCloseMobileVariantSelector() {
    let mobileTriggers = document.querySelectorAll(".closeVariantSelector");

    for (let i = 0; i < mobileTriggers.length; i++) {
      let mobileTrigger = mobileTriggers[i];
      mobileTrigger.addEventListener('touchstart', (evt) => {
        const firstTouch = getTouches(evt)[0];
        xDownVariant = firstTouch.clientX;
        yDownVariant = firstTouch.clientY;
      }, false);

      mobileTrigger.addEventListener('touchmove', (evt) => {
        if (!xDownVariant || !yDownVariant) {
          return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDownVariant - xUp;
        var yDiff = yDownVariant - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        } else {
          if (yDiff > 0) {
            /* up swipe */
            // alert("swipe up...")
          } else {
            /* down swipe */
            // alert("swipe down...")
            swipeDownVariantSelector(mobileTrigger);
          }
        }
        /* reset values */
        xDownVariant = null;
        yDownVariant = null;
      }, false);
    }
  }
  
  function swipeDownVariantSelector(mobileTriggerElement) {
    let variantOverlayWrapper = $(mobileTriggerElement).closest('.variantSelector_wrapper')[0];
    let background = $(mobileTriggerElement).closest('.variantoverlayNew')[0];
  
    variantOverlayWrapper.classList.add('animate-top');
    removeEventListener("click", variantSelectorClick);
    
    setTimeout(() => {
      background.style.display = "none";
      variantOverlayWrapper.classList.remove('animate-top');
      document.getElementsByTagName("html")[0].classList.remove("scrollPrevent")
      document.querySelector('.template-collection').style.overflow = "visible";
      document.getElementsByTagName("html")[0].classList.remove("no-scroll");
      document.querySelector(".scrollPreventer").style.overflow = "visible";
    }, 550)
  }
  
  const displayedProducts = data.shopifyCollection.products.slice(0, displayProductCount)
  return (
    <>
      <div id="shopify-section-collection-template" className="shopify-section">
        <div data-section-id="collection-template" data-section-type="collection-template">
          <header className="collection-header">
            <div className="page-width">
              <div className="section-header text-center">
                <h1>
                  <span className="visually-hidden" 
                    data-acsb-original-letter-spacing-value="normal" 
                    style={{ letterSpacing: '2px' }}>Collection: </span>

                  <span className="goals-section-text" 
                    data-acsb-original-letter-spacing-value="normal" 
                    style={{ letterSpacing: '2px' }}>{data.shopifyCollection.title}</span>
                  
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <span className="collection-page_underline"></span>
                  </span>
                </h1>
              </div>

              <div className="rte">
                <div id="collectionDescription"
                  data-acsb-original-letter-spacing-value="normal" 
                  style={{ letterSpacing: '2px' }}>

                  <div dangerouslySetInnerHTML={{__html: data.shopifyCollection.descriptionHtml}} />
                  <div id="collectionReadMore" 
                    onClick={collectionShowMore} 
                    data-acsb-original-letter-spacing-value="normal" 
                    style={{ letterSpacing: '2px', display: 'block' }}>Read More</div>
                  <div id="collectionShowLess" 
                    onClick={collectionShowLess} 
                    data-acsb-original-letter-spacing-value="normal" 
                    style={{ letterSpacing: '2px', display: 'none' }}>Show Less</div>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div style={{display: 'none'}} dangerouslySetInnerHTML={{ __html: productReviews[0].reviews }} />
        <div className="" id="Collection">
          <ul id="shop-all-content" 
            className="products-on-page grid grid--uniform grid--view-items">
              {
                displayedProducts.map((productItem, productIndex) => {
                  const productReview = productReviews.filter(pr => pr.handle === productItem.handle)
                  return <ProductBox product={productItem} key={productIndex} review={productReview[0]} />
                })
              }
          </ul>
          
        </div>
        
        {
          displayProductCount < data.shopifyCollection.products.length ? (
            <div className="load-more">
              <a className="load-more_btn" onClick={loadMoreProducts} 
                data-acsb-original-letter-spacing-value="normal" 
                style={{ letterSpacing: '2px' }}>LOAD MORE</a>
              <div className="load-more_loader"></div>
            </div>
          ) : null
        }
      </div>
      
    </>
  )
}

export default collectionPage

export const query = graphql`
  query($id: String!){
		shopifyCollection(handle: {eq: $id}) {
			id
      handle
      title
      descriptionHtml
      products {
        id
        handle
        title
        images {
          originalSrc
        }
        variants {
          id
          availableForSale
          price
        }
      }
    }
	}
`