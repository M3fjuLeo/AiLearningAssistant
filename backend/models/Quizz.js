import mongoose from "mongoose";

const quizzSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: {
      type: [
        {
          question: {
            type: String,
            required: true,
          },
          options: {
            type: [String],
            required: true,
            validate: [
              (arr) => arr.length === 4,
              "Must have exactly 4 options",
            ],
          },
          correctAnswer: {
            type: String,
            required: true,
          },
          explanation: {
            type: String,
            default: "",
          },
          difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium",
          },
        },
      ],
      required: true,
    },
    userAnswers: [
      {
        questionIndex: {
          type: Number,
          required: true,
        },
        selectedAnswer: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
        answeredAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster queries
quizzSchema.index({ userId: 1, documentId: 1 });

const Quizz = mongoose.model("Quizz", quizzSchema);

export default Quizz;
