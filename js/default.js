$( document ).ready(function(){
    var domains = Array();

    domains.push({
      name : "EVALUAR, ORIENTAR Y SUPERVISAR",
      processes:
      [{   id: "EDM01",
          name: "Asegurar el establecimiento y mantenimiento del marco de gobierno."
      },{
          id: "EDM02",
          name: "Asegurar la entrega de beneficios"
      },{
          id: "EDM03",
          name: "Asegurar la optimización del riesgo"
      },{
          id: "EDM04",
          name: "Asegurar la optimización de recursos."
      },{
          id: "EDM05",
          name: "Asegurar la transparencia de las partes interesadas"
      }]});

    domains.push({
      name : "ALINEAR, PLANIFICAR Y ORGANIZAR",
      processes:
      [{
          id: "APO01",
          name: "Gestionar el marco de gestión de TI"
      },{
          id: "APO02",
          name: "Manejar estrategia"
      },{
          id: "APO03",
          name: "Administrar la arquitectura empresarial"
      },{
          id: "APO04",
          name: "Gestionar la innovación"
      },{
          id: "APO05",
          name: "Administrar portafolio"
      },{
          id: "APO06",
          name: "Gestionar presupuesto y costes"
      },{
          id: "APO07",
          name: "Gestionar recursos humanos"
      },{
          id: "APO08",
          name: "Administrar relaciones"
      },{
          id: "APO09",
          name: "Gestionar Acuerdos de Servicio"
      },{
          id: "APO10",
          name: "Administrar Proveedores"
      },{
          id: "APO11",
          name: "Gestionar la calidad"
      },{
          id: "APO12",
          name: "Gestionar el Riesgo"
      },{
          id: "APO13",
          name: "Administrar la seguridad"
      }]});

    domains.push({
      name : "CONSTRUIR, ADQUIRIR E IMPLEMENTAR",
      processes:
      [{
          id: "BAI01",
          name: "Gestionar programas y proyectos"
      },{
          id: "BAI02",
          name: "Administrar los requisitos de definición"
      },{
          id: "BAI03",
          name: "Administrar los requisitos de definición"
      },{
          id: "BAI04",
          name: "Gestionar disponibilidad y capacidad"
      },{
          id: "BAI05",
          name: "Gestionar la habilitación del cambio organizacional"
      },{
          id: "BAI06",
          name: "Gestionar cambios"
      },{
          id: "BAI07",
          name: "Gestionar la aceptación de cambios y la transición"
      },{
          id: "BAI08",
          name: "Gestionar el conocimiento"
      },{
          id: "BAI09",
          name: "Gestionar activos"
      },{
          id: "BAI10",
          name: "Administrar la configuración"
      }]});


    domains.push({
      name : "ENTREGAR, DAR SERVICIO Y SOPORTE",
      processes:
      [{
          id: "DSS01",
          name: "Gestionar operaciones"
      },{
          id: "DSS02",
          name: "Gestionar solicitudes de servicio e incidentes"
      },{
          id: "DSS03",
          name: "Manejar problemas"
      },{
          id: "DSS04",
          name: "Gestionar la continuidad"
      },{
          id: "DSS05",
          name: "Administrar servicios de seguridad"
      },{
          id: "DSS06",
          name: "Gestionar los controles de procesos de negocio."
      }]});

    domains.push({
      name : "SUPERVISAR, EVALUAR Y VALORAR",
      processes:
      [{
          id: "MEA01",
          name: "Monitorear, evaluar y evaluar el desempeño y la conformidad."
      },{
          id: "MEA02",
          name: "Monitorear, evaluar y evaluar el sistema de control interno."
      },{
          id: "MEA03",
          name: "Monitorear, evaluar y evaluar el cumplimiento de requisitos externos."
      }]});


    domains.forEach(function(domain){

        var domainWrapperTemplate = $(".domainWrapperTemplate").clone();
        var allDomainsWrapper = $(".allDomainsWrapper");

        var processesWrapper = $(domainWrapperTemplate).find(".domain-processes");

        $(domainWrapperTemplate).removeClass("domainWrapperTemplate");
        $(domainWrapperTemplate).find(".domain-name").html(domain.name);

        domain.processes.forEach(function(process){

          var processTemplate = $(".cardTemplate").clone();
          var cardAction = $(processTemplate).find(".card-action");

          $(processTemplate).removeClass("cardTemplate");

          $(processTemplate).find(".process-id").html(process.id);
          $(processTemplate).find(".process-name").html(process.name);

          $(cardAction).on("click", function(){
            alert(process.id+" "+process.name);
          })

          $(processesWrapper).append(processTemplate);

        });

        $(allDomainsWrapper).append(domainWrapperTemplate)

    });



    $('.collapsible').collapsible();
});
