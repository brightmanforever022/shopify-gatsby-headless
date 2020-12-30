import React from 'react';
import { StaticQuery, graphql } from 'gatsby'
import Header from "../components/header"
import Footer from "../components/footer"
import Instagram from "../components/instagram"
import SubscribeSection from "../components/subscribeSection"
import Provider from "../context/provider"
import "../../resources/css/layout.scss"
import "../../resources/css/base.scss"


const Layout = ({ path, children }) => {
    
	return (
		<Provider>
			<StaticQuery
				query={graphql`
				query SiteTitleQuery {
					site {
						siteMetadata {
							title
						}
					}
				}
			`}
			render={data => (
				<div className="scrollPreventer">
					<Header path={path} />
					<div className="page-container drawer-page-content" id="PageContainer">
						{children}
						<div className="shopify-section index-section index-section--flush">
							<Instagram />
							<SubscribeSection />
						</div>
						<Footer />
					</div>
				</div>
			)}
			/>
		</Provider>
	);
};

export default Layout;

