/**
 * Data for the Watch Repairs & Servicing page.
 * Each block maps to a ServiceBlock component.
 */

const SHARED_REPAIRS_PARAGRAPH =
  'Our highly skilled Watchmakers use classic techniques and state of the art equipment to repair your timepiece to the highest standard. The Time Gallery can undertake all watch repairs restoring your watch to its former glory. You can be sure your watch is in safe hands, all watches are fully insured for your peace of mind.';

const services = [
  {
    id: 'watch-repairs',
    title: 'Watch Repairs',
    icon: 'repairs',
    paragraphs: [SHARED_REPAIRS_PARAGRAPH],
    bullets: ['All Brands Can Be Repaired'],
  },
  {
    id: 'refurbishment',
    title: 'Refurbishment',
    icon: 'refurbishment',
    paragraphs: [SHARED_REPAIRS_PARAGRAPH],
    bullets: ['All Brands Can Be Repaired'],
  },
  {
    id: 'glass-replacement',
    title: 'Glass Replacement',
    icon: 'glass',
    paragraphs: [
      'Whether your watch has a mineral, sapphire or acrylic glass, we can replace it. We use official parts and replace your watch\u2019s seals to ensure your watch is water-resistant if applicable.',
    ],

    bullets: ['Saphire', 'Mineral', 'Acrylic', 'Replacement Seals Included'],
  },
  {
    id: 'watch-service',
    title: 'Watch Service',
    icon: 'service',
    paragraphs: [
      'When servicing your watch at The Time Gallery we fully strip the movement and every individual part is inspected for wear. The movement is then ultrasonically cleaned. If any parts are required, original factory parts will be fitted. The movement is then assembled and oiled as required. When completed the watch is timed in six positions and kept on test for 48 hrs. Your watch movement is then fitted to the ultrasonically cleaned case and bracelet.',
    ],
    bullets: [
      '1 Year Guarantee',
      'Official Manufacturers Parts',
      'Ultrasonically cleaned',
      'Watch Service',
    ],
  },
  {
    id: 'battery-reseal',
    title: 'Battery & Reseal',
    icon: 'battery',
    caption: 'Tag Heuer replacement battery',
    paragraphs: [
      'All our batteries are Swiss made and are guaranteed for 1 year. We also replace and reseal glass and back gaskets and pressure test your watch ensuring your watch is watertight.',
    ],
    bullets: [
      'Swiss Batteries (1 Year Guarantee)',
      'Replacement Gaskets and Reseal',
      'Pressure Tested',
    ],
  },
  {
    id: 'crown-replacement',
    title: 'Crown Replacement',
    icon: 'crown',
    paragraphs: [
      'If your crown is damaged, letting in water or lost we can replace it. We use official stock items to ensure your watch is as original as possible and watertight.',
    ],
    includedLine: 'Included in our services are:',
    bullets: [
      'Official Crowns (Omega, Breitling, Panerai etc)',
      'Replacement Seals Included.',
    ],
  },
  {

    id: 'strap-bracelet-replacement',
    title: 'Strap and Bracelet Replacement',
    titleLink: 'http://watchrepairuk.com/watch-services/strap-bracelet-replacement/',
    icon: 'strap',
    paragraphs: [
      'The watch straps and bracelets are available in various materials (e.g. leather, stainless steel, synthetic etc.)',
    ],
    includedLine: 'Included in our services are:',
    bullets: [
      'Official Crowns (Omega, Rolex, IWC etc)',
      'Replacement Seals Included.',
    ],
  },
];

export default services;
