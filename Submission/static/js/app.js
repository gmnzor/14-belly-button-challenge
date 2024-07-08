// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadataPulled = data.metadata

    // Filter the metadata for the object with the desired sample number
    let metadataBuilt = metadataPulled.filter(item => item.id == sample)[0]

     // Use d3 to select the panel with id of `#sample-metadata`
    let sampleDisplay = d3.select(`#sample-metadata`);

    // Use `.html("") to clear any existing metadata
    sampleDisplay.html();

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

    for (const key in metadataBuilt) {
      if (metadataBuilt.hasOwnProperty(key)) {
        sampleDisplay.append("h6")
        .text(`${key.toUpperCase()}: ${metadataBuilt[key]}\n`)
        .attr();
      }
    };
    
  });
}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let dropdownMenu = d3.select(`#selDataset`)
    let selectedSample = dropdownMenu.property("value")

    // Filter the samples for the object with the desired sample number
    let sampleDataBuilt = data.samples.filter(item => item.id == selectedSample)[0]

     // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sampleDataBuilt.otu_ids;
    let otu_labels = sampleDataBuilt.otu_labels;
    let sample_values = sampleDataBuilt.sample_values;
    let title = "Bacteria Cultures per Sample";
    

    // Build a Bubble Chart
    let trace1 ={
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size:sample_values,
        color:otu_ids
      }

    }

    let traceData = [trace1];

    let layout = {
      title: title,
      xaxis: {
        title: "OTU ID"
      },
      yaxis: {
        title: "Number of Bacteria"
      }
    };
    // Render the Bubble Chart
    Plotly.newPlot(`bubble`,traceData, layout )

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select(`#selDataset`);
    
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i=0; i < names.length; i++)  {
      let name = names[i];

      dropdownMenu.append("option")
        .text(name)
        .attr('value', name);
    };

    // Get the first sample from the list
    let firstSample = names[0]

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample)
    buildCharts(firstSample)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
