<?php

$page = $_GET['page'] ?? 'home';

switch ($page) {

    case 'products':
        require '../app/views/products/index.php';
        break;

    case 'categories':
        require '../app/views/categories/index.php';
        break;

    case 'about':
        require '../app/views/about/index.php';
        break;

    default:
        require '../app/views/home/index.php';
}
