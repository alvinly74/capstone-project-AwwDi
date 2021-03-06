class SessionsController < ApplicationController
  def new
  end

  def guest
    @user = User.find(1)
    sign_in(@user)
    redirect_to root_url
  end

  def create
    user = User.find_by_credentials(
    params[:user][:username],
    params[:user][:password]
    )

    if user
      sign_in(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    sign_out
    render json: "Logged out"
  end
end
