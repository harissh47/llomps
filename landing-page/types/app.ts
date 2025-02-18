import { CarouselImage } from "@/app/components/chat/chat-with-history/container/container"
import { CollectionType } from "@/app/components/tools/types"
import type { AnnotationReplyConfig, ChatPromptConfig, CompletionPromptConfig, DatasetConfigs, PromptMode } from "@/models/debug"

export const AppModes = ['advanced-chat', 'agent-chat', 'chat', 'completion', 'workflow'] as const
export type AppMode = typeof AppModes[number]

export enum TransferMethod {
  all = 'all',
  local_file = 'local_file',
  remote_url = 'remote_url',
}

export enum ModelModeType {
  'chat' = 'chat',
  'completion' = 'completion',
  'unset' = '',
}

export enum RETRIEVE_TYPE {
  oneWay = 'single',
  multiWay = 'multiple',
}

export enum RETRIEVE_METHOD {
  semantic = 'semantic_search',
  fullText = 'full_text_search',
  hybrid = 'hybrid_search',
  invertedIndex = 'invertedIndex',
  keywordSearch = 'keyword_search',
}

export type VisionFile = {
  id?: string
  type: string
  transfer_method: TransferMethod
  url: string
  upload_file_id: string
  belongs_to?: string
}

export type VisionSettings = {
  enabled: boolean
  number_limits: number
  detail: Resolution
  transfer_methods: TransferMethod[]
  image_file_size_limit?: number | string
}

export type ImageFile = {
  type: TransferMethod
  _id: string
  fileId: string
  file?: File
  progress: number
  url: string
  base64Url?: string
  deleted?: boolean
}

export enum Resolution {
  low = 'low',
  high = 'high',
}

export const ALLOW_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'gif']

export type TextTypeFormItem = {
  default: string
  label: string
  variable: string
  required: boolean
  max_length: number
}

export type SelectTypeFormItem = {
  default: string
  label: string
  variable: string
  required: boolean
  options: string[]
}

export type ParagraphTypeFormItem = {
  default: string
  label: string
  variable: string
  required: boolean
}

/**
 * User Input Form Item
 */
export type UserInputFormItem = {
  'text-input': TextTypeFormItem
} | {
  'select': SelectTypeFormItem
} | {
  'paragraph': TextTypeFormItem
}

export type AgentTool = {
  provider_id: string
  provider_type: CollectionType
  provider_name: string
  tool_name: string
  tool_label: string
  tool_parameters: Record<string, any>
  enabled: boolean
  isDeleted?: boolean
  notAuthor?: boolean
}

export type ToolItem = {
  dataset: {
    enabled: boolean
    id: string
  }
} | {
  'sensitive-word-avoidance': {
    enabled: boolean
    words: string[]
    canned_response: string
  }
} | AgentTool

export enum AgentStrategy {
  functionCall = 'function_call',
  react = 'react',
}

/**
 * Model configuration. The backend type.
 */
export type ModelConfig = {
  opening_statement: string
  show_carousel: boolean
  show_openingcontainer: boolean
  carousel_images: CarouselImage[]
  suggested_questions?: string[]
  pre_prompt: string
  prompt_type: PromptMode
  chat_prompt_config: ChatPromptConfig | {}
  completion_prompt_config: CompletionPromptConfig | {}
  user_input_form: UserInputFormItem[]
  dataset_query_variable?: string
  more_like_this: {
    enabled: boolean
  }
  suggested_questions_after_answer: {
    enabled: boolean
  }
  speech_to_text: {
    enabled: boolean
  }
  text_to_speech: {
    enabled: boolean
    voice?: string
    language?: string
  }
  retriever_resource: {
    enabled: boolean
  }
  sensitive_word_avoidance: {
    enabled: boolean
  }
  annotation_reply?: AnnotationReplyConfig
  agent_mode: {
    enabled: boolean
    strategy?: AgentStrategy
    tools: ToolItem[]
  }
  model: {
    /** LLM provider, e.g., OPENAI */
    provider: string
    /** Model name, e.g, gpt-3.5.turbo */
    name: string
    mode: ModelModeType
    /** Default Completion call parameters */
    completion_params: {
      /** Maximum number of tokens in the answer message returned by Completion */
      max_tokens: number
      /**
       * A number between 0 and 2.
       * The larger the number, the more random the result;
       * otherwise, the more deterministic.
       * When in use, choose either `temperature` or `top_p`.
       * Default is 1.
       */
      temperature: number
      /**
       * Represents the proportion of probability mass samples to take,
       * e.g., 0.1 means taking the top 10% probability mass samples.
       * The determinism between the samples is basically consistent.
       * Among these results, the `top_p` probability mass results are taken.
       * When in use, choose either `temperature` or `top_p`.
       * Default is 1.
       */
      top_p: number
      /** When enabled, the Completion Text will concatenate the Prompt content together and return it. */
      echo: boolean
      /**
       * Specify up to 4 to automatically stop generating before the text specified in `stop`.
       * Suitable for use in chat mode.
       * For example, specify "Q" and "A",
       * and provide some Q&A examples as context,
       * and the model will give out in Q&A format and stop generating before Q&A.
       */
      stop: string[]
      /**
       * A number between -2.0 and 2.0.
       * The larger the value, the less the model will repeat topics and the more it will provide new topics.
       */
      presence_penalty: number
      /**
       * A number between -2.0 and 2.0.
       * A lower setting will make the model appear less cultured,
       * always repeating expressions.
       * The difference between `frequency_penalty` and `presence_penalty`
       * is that `frequency_penalty` penalizes a word based on its frequency in the training data,
       * while `presence_penalty` penalizes a word based on its occurrence in the input text.
       */
      frequency_penalty: number
    }
  }
  dataset_configs: DatasetConfigs
  file_upload?: {
    image: VisionSettings
  }
  files?: VisionFile[]
  created_at?: number
}

/**
 * Web Application Configuration
 */
export type SiteConfig = {
  /** Application URL Identifier: `http://dify.app/{access_token}` */
  access_token: string
  /** Public Title */
  title: string
  /** Application Description will be shown in the Client  */
  description: string
  /** Author */
  author: string
  /** User Support Email Address */
  support_email: string
  /**
   * Default Language, e.g. zh-Hans, en-US
   * Use standard RFC 4646, see https://www.ruanyifeng.com/blog/2008/02/codes_for_language_names.html
   */
  // default_language: Language
  /**  Custom Domain */
  customize_domain: string
  /** Theme */
  theme: string
  /** Custom Token strategy Whether Terminal Users can choose their OpenAI Key */
  customize_token_strategy: 'must' | 'allow' | 'not_allow'
  /** Is Prompt Public */
  prompt_public: boolean
  /** Web API and APP Base Domain Name */
  app_base_url: string
  /** Copyright */
  copyright: string
  /** Privacy Policy */
  privacy_policy: string
  /** Custom Disclaimer */
  custom_disclaimer: string

  icon: string
  icon_background: string
}

/**
 * App
 */
export type App = {
  /** App ID */
  id: string
  /** Name */
  name: string
  /** Description */
  description: string

  /** Icon */
  icon: string
  /** Icon Background */
  icon_background: string

  /** Mode */
  mode: AppMode
  /** Enable web app */
  enable_site: boolean
  /** Enable web API */
  enable_api: boolean
  /** API requests per minute, default is 60 */
  api_rpm: number
  /** API requests per hour, default is 3600 */
  api_rph: number
  /** Whether it's a demo app */
  is_demo: boolean
  /** Model configuration */
  model_config: ModelConfig
  app_model_config: ModelConfig
  /** Timestamp of creation */
  created_at: number
  /** Web Application Configuration */
  site: SiteConfig
  /** api site url */
  api_base_url: string
  tags: Tag[]
}

export type Tag = {
  id: string
  name: string
  type: string
  binding_count: number
}
