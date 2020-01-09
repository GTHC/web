class Post < ApplicationRecord
  validates :title, length: { minimum: 2 }
  validates :body, length: { maximum: 1000 }
end
