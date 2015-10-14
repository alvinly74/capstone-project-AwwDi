class Song < ActiveRecord::Base
  validates :title, :url, :description, :user_id, presence: true
  validates :url, uniqueness: true

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
  has_many(
    :likers_model,
    class_name: "SongLike",
    foreign_key: :song_id,
    primary_key: :id
  )
  has_many(
    :likers,
    through: :likers_model,
    source: :liker
  )

  def self.liked_songs
    
  end

  def self.followed_songs

  end

  def self.uploaded_songs

  end
end
