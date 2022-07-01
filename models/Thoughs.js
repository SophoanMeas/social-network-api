const { schema, model, types, Schema } = require("mongoose");
const dateFormat = require();
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getter: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual('reactionCount').get(()=>{
    return this.reactions.length;
})

const Thoughts = model("Thoughts", ThoughtSchema);

model.exports = Thoughts; 