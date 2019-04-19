$(document).ready(function(){


      var domains = Array();

      domains.push({
        name : "EVALUAR, ORIENTAR Y SUPERVISAR",
        processes:
        [{   id: "EDM01",
            domain: 1,
            isActive: false,
            name: "Asegurar el establecimiento y mantenimiento del marco de gobierno."
        },{
            id: "EDM02",
            domain: 1,
            isActive: false,
            name: "Asegurar la entrega de beneficios"
        },{
            id: "EDM03",
            domain: 1,
            isActive: false,
            name: "Asegurar la optimización del riesgo"
        },{
            id: "EDM04",
            domain: 1,
            isActive: false,
            name: "Asegurar la optimización de recursos."
        },{
            id: "EDM05",
            domain: 1,
            isActive: false,
            name: "Asegurar la transparencia de las partes interesadas"
        }]});

      domains.push({
        name : "ALINEAR, PLANIFICAR Y ORGANIZAR",
        processes:
        [{
            id: "APO01",
            domain: 2,
            isActive: false,
            name: "Gestionar el marco de gestión de TI"
        },{
            id: "APO02",
            domain: 2,
            isActive: false,
            name: "Manejar estrategia"
        },{
            id: "APO03",
            domain: 2,
            isActive: false,
            name: "Administrar la arquitectura empresarial"
        },{
            id: "APO04",
            domain: 2,
            isActive: false,
            name: "Gestionar la innovación"
        },{
            id: "APO05",
            domain: 2,
            isActive: false,
            name: "Administrar portafolio"
        },{
            id: "APO06",
            domain: 2,
            isActive: false,
            name: "Gestionar presupuesto y costes"
        },{
            id: "APO07",
            domain: 2,
            isActive: false,
            name: "Gestionar recursos humanos"
        },{
            id: "APO08",
            domain: 2,
            isActive: false,
            name: "Administrar relaciones"
        },{
            id: "APO09",
            domain: 2,
            isActive: false,
            name: "Gestionar Acuerdos de Servicio"
        },{
            id: "APO10",
            domain: 2,
            isActive: false,
            name: "Administrar Proveedores"
        },{
            id: "APO11",
            domain: 2,
            isActive: false,
            name: "Gestionar la calidad"
        },{
            id: "APO12",
            domain: 2,
            isActive: false,
            name: "Gestionar el Riesgo"
        },{
            id: "APO13",
            domain: 2,
            isActive: false,
            name: "Administrar la seguridad"
        }]});

      domains.push({
        name : "CONSTRUIR, ADQUIRIR E IMPLEMENTAR",
        processes:
        [{
            id: "BAI01",
            domain: 3,
            isActive: false,
            name: "Gestionar programas y proyectos"
        },{
            id: "BAI02",
            domain: 3,
            isActive: false,
            name: "Administrar los requisitos de definición"
        },{
            id: "BAI03",
            domain: 3,
            isActive: false,
            name: "Administrar los requisitos de definición"
        },{
            id: "BAI04",
            domain: 3,
            isActive: false,
            name: "Gestionar disponibilidad y capacidad"
        },{
            id: "BAI05",
            domain: 3,
            isActive: false,
            name: "Gestionar la habilitación del cambio organizacional"
        },{
            id: "BAI06",
            domain: 3,
            isActive: false,
            name: "Gestionar cambios"
        },{
            id: "BAI07",
            domain: 3,
            isActive: false,
            name: "Gestionar la aceptación de cambios y la transición"
        },{
            id: "BAI08",
            domain: 3,
            isActive: false,
            name: "Gestionar el conocimiento"
        },{
            id: "BAI09",
            domain: 3,
            isActive: false,
            name: "Gestionar activos"
        },{
            id: "BAI10",
            domain: 3,
            isActive: false,
            name: "Administrar la configuración"
        }]});


      domains.push({
        name : "ENTREGAR, DAR SERVICIO Y SOPORTE",
        processes:
        [{
            id: "DSS01",
            domain: 4,
            isActive: false,
            name: "Gestionar operaciones"
        },{
            id: "DSS02",
            domain: 4,
            isActive: false,
            name: "Gestionar solicitudes de servicio e incidentes"
        },{
            id: "DSS03",
            domain: 4,
            isActive: false,
            name: "Manejar problemas"
        },{
            id: "DSS04",
            domain: 4,
            isActive: false,
            name: "Gestionar la continuidad"
        },{
            id: "DSS05",
            domain: 4,
            isActive: false,
            name: "Administrar servicios de seguridad"
        },{
            id: "DSS06",
            domain: 4,
            isActive: false,
            name: "Gestionar los controles de procesos de negocio."
        }]});

      domains.push({
        name : "SUPERVISAR, EVALUAR Y VALORAR",
        processes:
        [{
            id: "MEA01",
            domain: 5,
            isActive: false,
            name: "Monitorear, evaluar y evaluar el desempeño y la conformidad."
        },{
            id: "MEA02",
            domain: 5,
            isActive: false,
            name: "Monitorear, evaluar y evaluar el sistema de control interno."
        },{
            id: "MEA03",
            domain: 5,
            isActive: false,
            name: "Monitorear, evaluar y evaluar el cumplimiento de requisitos externos."
        }]});

      var collection = Array();

      domains.forEach(function(domain){

          collection = collection.concat(domain.processes);

      });

      console.log(collection);

      /*
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
       */
});
