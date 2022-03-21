"use strict";
const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API = 'https://api.sampleapis.com/coffee';

const fetchProductsList = (URL, title, name, productType, res) => {
	fetch(URL)
		.then(res => res.json())
		.then(data => {
			data.productType = productType;
			res.render('pages/product-list', {
				title: title,
				name: name,
				data
			});
		});
};

const fetchProduct = (URL, res) => {
	fetch(URL)
		.then(res => res.json())
		.then(data => {
			res.render('pages/single-product', {
				title: `${data.title} page`,
				name: `Check out this ${data.title}`,
				data
			});
		});
};

router.get('/hot', (req, res) => {
	fetchProductsList(`${API}/hot`, 'Buy Hot Coffee', 'Check out our hot coffee listing', 'hot', res);
});

router.get('/iced', (req, res) => {
	fetchProductsList(`${API}/iced`, 'Buy Iced Coffee', 'Check out our iced coffee listing', 'iced', res);
});

router.get('/hot/:id', (req, res) => {
	const id = parseInt(req.params.id);
	fetchProduct(`${API}/hot/${id}`, res);
});

router.get('/iced/:id', (req, res) => {
	const id = parseInt(req.params.id);
	fetchProduct(`${API}/iced/${id}`, res);
});

module.exports = router;
