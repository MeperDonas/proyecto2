-include local/.env
VARS:=$(shell sed -ne 's/ *\#.*$$//; /./ s/=.*$$// p' .env 2> /dev/null )
$(foreach v,$(VARS),$(eval $(shell echo export $(v)="$($(v))")))

up:
  docker-compose -f local/docker-compose.yaml -p ecommerce up && docker-compose rm -fsv

rebuild:
  docker-compose -f local/docker-compose.yaml -p ecommerce build --no-cache back
