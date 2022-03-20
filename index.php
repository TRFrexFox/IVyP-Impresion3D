
  <!-- Jquery Library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <!-- Controlador -->
  <script src="assets/js/controller.js"></script>
<?php
if (isset($_GET['page']))
    switch ($_GET['page']) {
        case '':
            include 'pages/home.php';
            break;
        case 'Home':
            include 'pages/home.php';
            break;
        case 'Impresion':
            include 'pages/Formulario.php';
            break;
        case 'Mantenedor':
            include 'pages/Mantenedor.php';
            break;
        default:
            include 'error.php';
            break;
    }
else
    include 'pages/home.php';
