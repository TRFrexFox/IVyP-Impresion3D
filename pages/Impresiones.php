<body class="g-sidenav-show  bg-gray-200">
  <?php include "pages/common/sidebar.php" ?>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <div class="container-fluid py-4">
      <div id="etiqueta" class="etiqueta-detalle">
        <div id="agujero-etiqueta" class="row etiqueta-detalle-agujero">
          <button class="btn btn-info btn-etiqueta" onclick="$('#etiqueta').addClass('animate__animated animate__fadeOutBottomRight')">X</button>
        </div>
        <div id="etiqueta-content" style="padding: 15px;margin-top: 25%;">

        </div>
      </div>
      <div class="row" id="Contenedor">

      </div>
      <?php include 'pages/common/footer.php'; ?>
    </div>
  </main>
  <!--   Core JS Files   -->
  <script src="assets/js/core/popper.min.js"></script>
  <script src="assets/js/core/bootstrap.min.js"></script>
  <script src="assets/js/plugins/perfect-scrollbar.min.js"></script>
  <script src="assets/js/plugins/smooth-scrollbar.min.js"></script>
  <script>
    Init.Impresiones();
    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
      var options = {
        damping: '0.5'
      }
      Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }
  </script>
  <!-- Github buttons -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="assets/js/material-dashboard.min.js?v=3.0.0"></script>
</body>