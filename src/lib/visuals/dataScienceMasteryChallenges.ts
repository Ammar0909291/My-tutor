/**
 * Data Science Visual Mastery — challenge bank (Data Science Subject Library
 * sprint). Static, hand-authored multiple-choice challenges paired with the 5
 * existing Data Science VisualCard types (three_statistical_distribution,
 * three_data_visualization, three_correlation, three_clustering,
 * three_ml_pipeline). Purely additive data — no new challenge framework;
 * reuses the existing VisualMasterySignal / EvidenceRecord pipeline via
 * createMasteryEmitter (visualType: 'data_science_interactive'). Mirrors
 * computerScienceMasteryChallenges.ts.
 */
import type { VisualType } from '@/lib/school/visuals/visualTypes'

export interface DataScienceMasteryChallenge {
  id: string
  /** Which existing Data Science VisualCard renders the diagram for this challenge. */
  visual: VisualType
  /** revealStep to pin the diagram at (Infinity = fully revealed, the default teaching end-state). */
  revealStep?: number
  concept: string
  question: string
  options: string[]
  correctIndex: number
  /** The registered misconception theme this challenge targets (misconceptionEngine.ts RULES). */
  misconceptionType: string
}

export const DATA_SCIENCE_MASTERY_CHALLENGES: DataScienceMasteryChallenge[] = [
  {
    id: 'distribution_mean_outlier',
    visual: 'three_statistical_distribution',
    concept: 'mean_vs_typical_value',
    question: 'The distribution shown has a few extreme outliers. Does the mean still represent a "typical" value?',
    options: ['Yes, the mean always represents the typical value', 'Not necessarily — outliers can pull the mean away from where most of the data actually sits', 'The mean is unaffected by outliers'],
    correctIndex: 1,
    misconceptionType: 'ds_distribution_misconception',
  },
  {
    id: 'distribution_spread_vs_range',
    visual: 'three_statistical_distribution',
    concept: 'standard_deviation_vs_range',
    question: 'Is standard deviation the same thing as the range (max minus min) of the data?',
    options: ['Yes, they measure the same thing', 'No — standard deviation measures typical spread around the mean, while range only looks at the two extreme values', 'Range is always larger than standard deviation'],
    correctIndex: 1,
    misconceptionType: 'ds_distribution_misconception',
  },
  {
    id: 'visualization_truncated_axis',
    visual: 'three_data_visualization',
    concept: 'axis_scale_misreading',
    question: 'The bar chart shown has a y-axis that does not start at zero. Does the visual height difference between bars still represent the true proportional difference?',
    options: ['Yes, bar height always shows the true proportion', 'No — a truncated axis can exaggerate differences that look small once the axis starts at zero', 'Axis scale never affects how a chart looks'],
    correctIndex: 1,
    misconceptionType: 'ds_chart_misreading',
  },
  {
    id: 'visualization_trend_line',
    visual: 'three_data_visualization',
    concept: 'scatter_points_vs_trend_line',
    question: 'In the scatter plot shown, is the trend line just another way of drawing the raw data points?',
    options: ['Yes, it just connects the points', 'No — the trend line is a fitted model summarizing the overall pattern, distinct from the individual raw points', 'A trend line always passes through every point'],
    correctIndex: 1,
    misconceptionType: 'ds_chart_misreading',
  },
  {
    id: 'correlation_causation_claim',
    visual: 'three_correlation',
    concept: 'correlation_vs_causation',
    question: 'The visual shows two variables that are strongly correlated. Does that prove one causes the other?',
    options: ['Yes, strong correlation proves causation', 'No — correlation alone does not establish causation; a confounding variable or coincidence could explain it', 'Correlation only matters for negative relationships'],
    correctIndex: 1,
    misconceptionType: 'ds_correlation_causation',
  },
  {
    id: 'correlation_sign_meaning',
    visual: 'three_correlation',
    concept: 'negative_correlation_meaning',
    question: 'The visual shows a negative correlation between two variables. Does a negative correlation mean there is no relationship?',
    options: ['Yes, negative means no relationship', 'No — a negative correlation means an inverse relationship (as one rises, the other tends to fall), not the absence of one', 'Negative correlation is impossible in real data'],
    correctIndex: 1,
    misconceptionType: 'ds_correlation_causation',
  },
  {
    id: 'clustering_labels_assumed',
    visual: 'three_clustering',
    concept: 'clustering_vs_classification',
    question: 'Before the clustering shown ran, were the group labels for each point already known?',
    options: ['Yes, clustering starts from known labels like classification does', 'No — clustering discovers groups purely from how points are positioned, with no labels given in advance', 'Labels are required for clustering to work at all'],
    correctIndex: 1,
    misconceptionType: 'ds_clustering_misconception',
  },
  {
    id: 'clustering_fixed_count',
    visual: 'three_clustering',
    concept: 'cluster_count_is_a_choice',
    question: 'Is the number of clusters shown the one single "correct" number of groups for this data?',
    options: ['Yes, there is always exactly one correct cluster count', 'No — the number of clusters is a modeling choice; the same data could reasonably be grouped into a different number of clusters', 'Cluster count is always equal to the number of data points'],
    correctIndex: 1,
    misconceptionType: 'ds_clustering_misconception',
  },
  {
    id: 'ml_pipeline_skip_cleaning',
    visual: 'three_ml_pipeline',
    concept: 'cleaning_required_before_training',
    question: 'In the pipeline shown, could the model be trained directly on the raw, uncleaned data and still produce a reliable result?',
    options: ['Yes, raw data works just as well as cleaned data', 'No — skipping data cleaning typically produces a less reliable model, since errors and inconsistencies propagate through training', 'Cleaning is only needed after training, not before'],
    correctIndex: 1,
    misconceptionType: 'ds_ml_pipeline_misconception',
  },
  {
    id: 'ml_pipeline_training_vs_prediction',
    visual: 'three_ml_pipeline',
    concept: 'training_vs_prediction_phase',
    question: 'Are "training" and "prediction" the same step in the pipeline shown?',
    options: ['Yes, training and prediction are the same step', 'No — training is when the model learns from labeled examples; prediction is applying the already-trained model to new data', 'Prediction happens before training'],
    correctIndex: 1,
    misconceptionType: 'ds_ml_pipeline_misconception',
  },
]
