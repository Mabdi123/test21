//v1.1

var listAllSolutions ={
    SAM: {code: 1, displayNames:["SAM", "Suspicious Activity Monitoring"]},
    CDD: {code: 2, displayNames:["CDD"]},
    WLF: {code: 3, displayNames:["WLF"]}
};

//list of solutions that each customer has
var customerSolutionsMapping ={
    99 : [listAllSolutions.CDD.code, listAllSolutions.WLF.code]
};






//NOTE: Put this in body of master pages (Above last /body tag)

//	< script src = "Snippets_MasterPages/TOC_config.js">
//	</script>
//	<script src = "Snippets_MasterPages/TOC_script.js">
//	</script>