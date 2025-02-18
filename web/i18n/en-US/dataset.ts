const translation = {
  knowledge: 'Data Mind',
  documentCount: ' docs',
  wordCount: ' k words',
  appCount: ' linked apps',
  createDataset: 'Create Data Mind',
  // createDatasetIntro: 'Import your own text data or write data in real-time via Webhook for LLM context enhancement.',
  createDatasetIntro: 'Import your own textual data or generate data in real-time through a Webhook to enhance the context for LLM ',
  deleteDatasetConfirmTitle: 'Delete this Data Mind?',
  deleteDatasetConfirmContent:
    'Deleting the Data Mind is irreversible. Users will no longer be able to access your Data Mind, and all prompt configurations and logs will be permanently deleted.',
  datasetDeleted: 'Data Mind deleted',
  datasetDeleteFailed: 'Failed to delete Data Mind',
  didYouKnow: 'Did you know?',
  // intro1: 'The Data Mind can be integrated into the Dify application ',
  intro1: 'The Data Mind can be integrated into the Infinit Studio application ',
  intro2: 'as a context',
  intro3: ',',
  intro4: 'or it ',
  intro5: 'can be created',
  intro6: ' as a standalone ChatGPT index plug-in to publish',
  unavailable: 'Unavailable',
  unavailableTip: 'Embedding model is not available, the default embedding model needs to be configured',
  datasets: 'DATA MIND',
  datasetsApi: 'API ACCESS',
  retrieval: {
    semantic_search: {
      title: 'Vector Search',
      description: 'Generate query embeddings and search for the text chunk most similar to its vector representation.',
    },
    full_text_search: {
      title: 'Full-Text Search',
      description: 'Index all terms in the document, allowing users to search any term and retrieve relevant text chunk containing those terms.',
    },
    hybrid_search: {
      title: 'Hybrid Search',
      description: 'Execute full-text search and vector searches simultaneously, re-rank to select the best match for the user\'s query. Configuration of the Rerank model APIs necessary.',
      recommend: 'Recommend',
    },
    invertedIndex: {
      title: 'Inverted Index',
      description: 'Inverted Index is a structure used for efficient retrieval. Organized by terms, each term points to documents or web pages containing it.',
    },
    change: 'Change',
    changeRetrievalMethod: 'Change retrieval method',
  },
  docsFailedNotice: 'documents failed to be indexed',
  retry: 'Retry',
}

export default translation
